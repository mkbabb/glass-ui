# WAVE-AMENDMENT — dock-core (the concrete tranche amendment)

Reconciled against the extant 116-wave set in `docs/tranches/BD/union/waves/`. Reference
implementation: `docs/tranches/BD/greenfield/dock-core/GOLDEN.md` (hardened by `challenge/{1,2,3}.md`,
delta-assayed in `DELTA-ASSAY.md`). No duplicative work — the motion tokens are already booked by
the Band-0 siblings; this amendment AUGMENTS one wave, DEPENDS on three, RIDES one, and authors
ONE new dedicated channel + the born-RED width gate.

---

## 1. AUGMENT — `W-DOCK-CORE.md` (supersede the WIDTH leg of MOVE-I with the ratio-free blend)

**File:** `docs/tranches/BD/union/waves/W-DOCK-CORE.md`.

**What changes:** MOVE-I currently re-tunes the `dock` SPRING_PRESETS row + adds `transform-origin:
center` + a root re-center translate over the EXISTING `--dock-root-ratio`/`--dock-root-scale`
machinery. That machinery is the SEIZURE (live: collapse 2451.7px, expand 59→198.6→33.2→44.7→224,
`cxRange 0`). SUPERSEDE the size sub-leg:

- **DELETE** (`src/styles/dock/layers.css:129-160` + the inner `60-94`): the
  `--dock-root-ratio`/`--dock-root-scale`/`--dock-root-morph-{from,to}` rules (both `:not(.vertical)`
  AND `.vertical` arms) + the inner `--dock-morph-ratio`/`--dock-morph-scale` + the `max(…,0.06)`
  floors.
- **DELETE** (`src/components/custom/dock/composables/dockMorphMeasure.ts`):
  `measureAndArmMorph`, `seatTargetSync`, `rebaseSiblingSpans`, `forceNestedMaxContent`,
  `nestedTargetsWithin`, `measureTo`, `armRootMorphSpan`, `clearRootMorphSpan`, `morphMinFloorPx`,
  the per-target generation gating.
- **REPLACE** with: a `useDockExpandedSize` ResizeObserver (NEW in `dockMorphMeasure.ts`) writing
  `--dock-expanded-px`/`--dock-collapsed-px` ONCE per content change (+ re-measure on `fonts.ready`
  + first non-zero RO + visibility-enter; floor `--dock-expanded-px` at `max(measured,
  --dock-collapsed-px)` — challenge 3·R2 freshness guard); the `--dock-live` convex blend +
  clamped `--dock-size-scale` (DELTA-ASSAY §2a); `dockMorphContext.ts` shrinks to: arm
  `[data-morphing]`, run ONE `SpringProgress` writing `--dock-morph-t`, clear on settle.
- **KEEP** verbatim: MOVE-I's `transform-origin: center` (the cxRange-0 win, live-confirmed), the
  symmetric child stagger (`layers.css:373-433`), the self-blur dial-back, the collapsed-glyph
  center, the `collapseDelay` bump. KEEP the entire `W-DOCK-CORE` MOVE-II (fission wire) + MOVE-III
  (trigger/recolor hygiene) + the `proof:no-gray` Arm-A gate — UNTOUCHED.
- **NO RENAME** (challenge 1·R5 / 2·R6): keep `--dock-morph-t` (the real shipped token,
  `dock.css:83`); strike the golden's "`--dock-t` already exists" framing.

**Gate impact:** `W-DOCK-CORE`'s existing `tests-visual/dock-core.spec.ts` DC-CENTER (cx stable) +
DC-WEIGHT clauses are AUGMENTED by the new WIDTH bite (§4). The `proof:no-gray` Arm-A is unchanged.

---

## 2. NEW — `BD.W-DOCK-PUNCH-CHANNEL.md` (the dedicated `--dock-punch-stretch` + the born-RED width gate)

**File to author:** `docs/tranches/BD/union/waves/BD.W-DOCK-PUNCH-CHANNEL.md`.
**Reference:** `GOLDEN.md` §1(c)/§2 + `DELTA-ASSAY.md` §2(c)(d)(e).

**Why NEW (not folded into W-DOCK-CORE):** the squish-channel re-invent is a distinct,
challenge-mandated mechanism (challenge 1·R1, 2·R1, 2·R2, 3·R1, 3·R4) that the golden got wrong
(it shared `--stretch`). It is the AUDACITY half — separable from the correctness half (the size
blend), and its gate is a separate channel-collision + anticipation witness.

**The build:**
- Mint `@property --dock-punch-stretch` (CSS-only, `<number>`, init 1) — NOT subject to
  `--dock-morph-max-stretch: 1.14` (which STAYS for orientation/fission). Fold THREE factors on the
  one `scale:` in `shape.css:126-133`: `--dock-size-scale × --stretch × --dock-punch-stretch`, with
  the reciprocal cross-axis `1/(--stretch × --dock-punch-stretch)` (DELTA-ASSAY §2c).
- Drive `--dock-punch-stretch` via a SEPARATE one-shot WAAPI/CSS-`transition` on
  `--ease-cartoon-punch` (the ~4% pre-dip + ~22% overshoot), honestly a second punch animation
  layered on the spring (NOT "one clock") — and it RETURNS to 1 at settle (challenge 2·R1: never
  latch). `--motion-weight` (dock scope 1) co-scales depth; PRM → `--motion-weight: 0` zeroes it.
- Wire the kinetic cartoon CAST: the `--shadow-cartoon-md/lg` rung on an `::after`/inert-child
  caster, `transform`-travel wired to `--motion-weight` (opposite-morph slide), plain per-mode
  `.dark` arms (light-dark inset trap avoided).

**DEPENDS (no dup):** `BD.W-MOTION-WEIGHT` (ships `--motion-weight`), `BD.W-CARTOON-PUNCH` (ships
`--ease-cartoon-punch`), `BD.W-CARTOON-CASTER` (the inert-child caster + registered props) — all
Band-0 siblings. This wave is their FIRST dock consumer; it does NOT re-ship the tokens or the
caster topology.

---

## 3. DEPEND / RIDE / CROSS-LINK (no edit, no dup)

- **DEPEND `BD.W-MOTION-WEIGHT` + `BD.W-CARTOON-PUNCH`** — the two motion tokens are BOOKED there
  (per §6 ledger: motion-spring-register + cartoon-shadow rows). The golden's proposed "NEW
  BD.W-MOTION-WEIGHT-CANON" is **REDUNDANT and NOT authored** (would duplicate the booked waves) —
  dock-core is a consumer, the canon ships in Band 0.
- **DEPEND `BD.W-CARTOON-CASTER`** — the kinetic cast leg consumes its inert-child caster.
- **RIDE `W-DOCK-SCROLL-FISSION.md`** — UNCHANGED. The fission assembly (engine 100%/assembly 0%)
  composes `useScrollChrome`→`useDockFission`; the split shares the re-tuned `dock` register (no
  second clock). The size re-invent does not touch the fission path; the dedicated
  `--dock-punch-stretch` REMOVES the mid-collapse-fission `--stretch` clobber the golden's shared
  channel would have introduced (challenge 3·R1) — a net IMPROVEMENT to fission, not a change to it.
- **CROSS-LINK `BD.W-VH-COMPOSE.md`** — UNTOUCHED. Live-confirmed the showcase still ships
  `view-transition-name` (the crossfade facsimile it retires). It composes the shipped
  `useDockOrientationMorph`; the size-leg re-invent leaves that driver byte-untouched (the
  V4 `git diff --quiet` fence holds).

**No PRUNE / no EXCISE.** Every touched wave is augmented or depended-upon, not deleted.

---

## 4. THE BORN-RED GATE (the width witness now EXISTS — wire it into the committed spec)

**File:** `tests-visual/dock-core.spec.ts` (the spec `W-DOCK-CORE` sketches; this amendment adds
the WIDTH arm — challenge 1·R3 / 2·R3 / 3·R5: it must run HEAD's REAL path, not a green toy).

The orchestrator CAPTURED the born-RED witness live on `/dock/overview` (DELTA-ASSAY §0):
`collapse maxW 2451.7px`, `expand 59→198.6→33.2→44.7→224`, `cxRange 0`. The committed clauses:

1. **`dock-width-bounded` (THE primary born-RED bite — runs on HEAD's real path):** fire the real
   hover gesture on the `/dock/overview` "Collapsible" dock; frame-sample
   `getBoundingClientRect().width`. Assert `max(width) ≤ --dock-expanded-px + 1px`. **Born-RED on
   HEAD** (live: 2451.7px ≫ 224). This clause needs NO `--motion-weight` and runs on the current
   tree — it is the unconditional witness (challenge 2·R3: the motion-weight-gated variant cannot
   run on HEAD).
2. **`dock-size-monotone` (the NEW-code regression guard):** with `--motion-weight: 0` (size in
   isolation), assert `width` monotone non-decreasing collapsed→expanded (`maxBackstep ≤ 1px`).
   GREEN only with the ratio-free blend.
3. **`dock-punch-overshoots-then-settles` (the audacity bar — challenge 2·R1):** with
   `--motion-weight: 1`, assert `max(width) > expanded` DURING travel AND `width` returns to
   `expanded ± 1px` AT settle AND `--dock-punch-stretch → 1` at settle (the spike latched +16% —
   this clause is its witness). Born-RED on a squish-less morph AND on the latching spike.
4. **`dock-fission-during-collapse-no-clobber` (challenge 3·R1):** fire a fission split mid-collapse;
   assert BOTH `--stretch` (JS-owned) AND `--dock-punch-stretch` (CSS-owned) compose on the `scale:`
   (no last-writer clobber). Born-RED on the shared-`--stretch` design.
5. **`dock-cx-pinned` (anti-regress):** cx excursion ≤ 4px (live HEAD already passes — KEEP green).
6. **`dock-expanded-px-fresh` (challenge 3·R2):** mount the dock hidden then reveal; assert no
   detonation frame (the freshness guard). Born-RED on a 0-measurement → `collapsed/0 = ∞`.
7. **BOTH modes**, Chromium + manual Safari 26 capture; PRM → instant. The judge watches the
   SCREEN-RECORDING gestalt and defaults to broken — a green cx with a broken width is an automatic
   FAIL.

---

## 5. SUMMARY OF THE AMENDMENT

| Action | Wave | What |
|---|---|---|
| **AUGMENT** | `W-DOCK-CORE.md` | supersede MOVE-I's WIDTH sub-leg (ratio→scale) with the ratio-free measure-ONCE convex blend; KEEP center-out/blur/stagger/MOVE-II/MOVE-III/no-gray; NO rename |
| **NEW** | `BD.W-DOCK-PUNCH-CHANNEL.md` | dedicated `--dock-punch-stretch` (off shared `--stretch`) + separate one-shot punch driver + kinetic cast wire; born-RED width gate |
| **DEPEND** | `BD.W-MOTION-WEIGHT`, `BD.W-CARTOON-PUNCH`, `BD.W-CARTOON-CASTER` | consume the booked tokens + caster; do NOT re-ship (golden's MOTION-WEIGHT-CANON dropped as redundant) |
| **RIDE** | `W-DOCK-SCROLL-FISSION.md` | unchanged; the dedicated channel REMOVES the mid-collapse clobber (a fission improvement) |
| **CROSS-LINK** | `BD.W-VH-COMPOSE.md` | untouched; driver byte-fenced |
| PRUNE / EXCISE | — | none |
