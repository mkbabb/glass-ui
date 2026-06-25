# CHIP FAMILY — WAVE-AMENDMENT (reconciled vs the 116-wave union set)

> The concrete tranche amendment for the CHIP family (ToggleChip · SelectableChip ·
> IconChip · toggle-group). Reconciled against `docs/tranches/BD/union/waves/` (116
> waves) so there is NO duplicative work vs tabs / buttons / select / tinted-chip /
> iconchip-glass. Reference implementation: `GOLDEN.md` (as CORRECTED by `DELTA-ASSAY.md`
> — the GOLDEN's phantom `.glass-capsule`-as-shipped + `.paper-field` re-mint are EXCISED;
> the REAL glass axis is `--glass-fill-tint`, minted at HEAD).

---

## 0. THE RECONCILE — what already exists (no-dup proof)

The GOLDEN proposed 4 NEW waves. Against the real union set, the chip family's "glassy"
home **already exists** and most of its dependencies are **already booked**:

| need | EXTANT wave / token (verified) | the chip's relation |
|---|---|---|
| per-instance colored-glass plate-fill | **`--glass-fill-tint`/`--glass-fill-strength` MINTED at HEAD** (`tokens/glass.css:399`); **`BD.W-TINTED-CHIP`** wires the ladder CONSUME + mints `<GlassChip :tone>` | the chip family is the **≥3rd plate-fill consumer** of this axis — DEPEND, never re-mint |
| icon-chip glass register | **`BD.W-ICONCHIP-GLASS`** (`<IconChip surface="glass">` reads `--glass-fill-tint`; the 2nd consumer) | the chip family's IconChip arm IS this wave — CROSS-LINK, the radius/φ congruence is the DELTA |
| the lozenge lens (rim/shadow/lift + warm-floor) | **`BD.W-TAB-IOS-CAPSULE`** — AUGMENTed by the tabs §6 amendment to EXTRACT `.glass-capsule`/`-hover` + warm-floor + EXPOSE `--glass-capsule-fill` | DEPEND on that amendment (the chip is the ≥4th capsule consumer after the tab indicator + 3 button sites) |
| the cartoon punch curve + PRM dial | **`BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH`** (booked in the §6 ledger; the motion-spring-register sibling) | DEPEND — the SAME register tabs/buttons/select consume; the chip never re-mints |
| the stadium radius | **`--radius-control` = `--radius-pill`** (`radius.css:56`) | CONSUME — retires the 4 ad-hoc chip radii |
| the tonal channels + safe ink | **`.accent-tone` + `useAccentTone`** (`accent-tone.css`) | REFINE the idle/band floor only; channels frozen |

**No new field wave** (the GOLDEN's `.paper-field` is EXCISED — phantom + mis-named; the page
chassis mounts whatever field, the chip transmits it through its translucent lens). **No new
glass-material fork** (the chip's body IS `--glass-fill-tint` over the `.glass-capsule` W55
composite — the SAME seam `BD.W-TINTED-CHIP`/`BD.W-ICONCHIP-GLASS` ship).

---

## 1. THE AMENDMENT — 1 NEW wave + 2 AUGMENTs + 1 CROSS-LINK + 5 DEPENDs

### NEW — `BD.W-CHIP-CONGRUENT-GLASS`
**The chip family's geometry unification + the warm-glass lens consume + the de-frauded punch
— ONE wave (the chip's `W-CHIP-CONGRUENT` + `W-CHIP-GLASS-LENS` + `W-CHIP-FLOOD-PUNCH` collapse
into one buildable wave; the group glide is DEFERRED).**

- **Band 7** (Cards / controls / glass-for-every-element — the same band as `W-TINTED-CHIP`/
  `W-ICONCHIP-GLASS`).
- **DEPENDS (HARD, the build-order precondition):**
  `BD.W-TAB-IOS-CAPSULE` (AUGMENTed: `.glass-capsule`/`-hover` + warm-floor + `--glass-capsule-fill`)
  · `BD.W-TINTED-CHIP` (the `--glass-fill-tint` ladder CONSUME-wire)
  · `BD.W-MOTION-WEIGHT` · `BD.W-CARTOON-PUNCH` (`--ease-cartoon-punch`/`--motion-weight`).
  **RED until all four merged to `src/`** — the glass/punch gate arms ERROR (no-such-token), not
  fail, before then.
- **CROSS-LINK:** `BD.W-ICONCHIP-GLASS` (the IconChip arm — the radius/φ congruence is this
  wave's DELTA on that wave's glass register; no re-mint of the glass plate).
- **Scope:**
  1. **Geometry (RE-INVENT).** Collapse `selectableChipVariants` (`sm`/`md`/`lg`) + the
     `ToggleChip` `chip`/`cell` axis into ONE `chipVariants({ size })` (`src/components/custom/
     .../chipVariants.ts`). Every inline rung resolves `--radius-control` (radius INVARIANT, no
     `rounded-*`); the `cell` is the ONE exception → `--radius-card`. φ padding/text rungs
     (√φ ladder). The 3 SFCs (`ToggleChip.vue`/`SelectableChip.vue`/`IconChip.vue`) render the
     shared register. Clean break, no alias (no-legacy law).
  2. **Material (`.glass-chip`, NET-NEW surface on REAL axes).** `src/styles/glass/glass-chip.css`
     (`@layer components`): `.glass-chip` composes `.glass-capsule` (the DEPENDed translucent
     lozenge — α<1 body so the backdrop transmits) + `.glass-capsule-hover` + `.accent-tone`,
     and tints the body via `--glass-fill-tint` (the CONSUMEd HEAD axis). **Declares ZERO own
     glass tokens** (no inline `backdrop-filter`/`--glass-bg-*`/rim — the no-fork fence). The
     idle warm-floor is a one-line `.accent-tone` widen
     (`max(--accent-fill-strength, --chip-tint-floor)`) that lifts idle **AND** the default-tone
     active band (the live finding: BOTH are gray over `--primary`). PLAIN per-mode
     `--chip-tint-floor` pair (12% light / 15% dark), NEVER `light-dark()`.
  3. **Motion (NET-NEW flood, DE-FRAUDED).** The state flip on `--ease-cartoon-punch` ×
     `--motion-weight` (DEPENDed). ONE `scale` write folds hover/active/punch into a single
     source of truth (no collision with the CVA `hover:scale-*`). `@property --chip-flood-t
     { inherits:TRUE }`; the `::after` colour bloom sits ABOVE the translucent fill inside
     `isolation:isolate`; the perceptible primary read is the COLOUR event (`--accent-band` swap
     on plain `data-state`, NOT tied to the scalar — survives a dead scalar on pre-Baseline
     WebKit). PRM → `--motion-weight:0` zeroes the MOTION; colour + lift remain.
  4. **IconChip reconcile.** IconChip adopts `--radius-control`/φ congruence + (for its glass
     register) the `--glass-fill-tint` axis from `BD.W-ICONCHIP-GLASS` — it is **NOT** forced
     through `.accent-tone`'s `in oklab` mix (that would regress the deliberate `in srgb`
     brand-overlay plate, `icon-chip.css:72`, fence AW.W26). The `in srgb` plate is KEPT as its
     own register; only geometry + the glass-fill axis converge.
- **GATE — `proof:chip-family` + `tests-visual/chip-family.spec.ts` (born-RED, SPLIT):**
  pinned to the REAL component DOM (a mount harness, NOT a Vite-fallback route). RED-now on
  geometry/idle-gray; DEFERRED on capsule/flood until upstreams land. Arms C1–C7 + C3c (no-fork
  fence) + C5b (`::after` opacity > 0 on ON chip — kills the challenge R1/R2 dead-flood) per
  `DELTA-ASSAY.md §7`. Painted-pixel chroma over a REAL field, chromium + webkit, both modes,
  H ∈ [45,85] hue floor (catches the live greenish cast). **The born-RED that LANDS on HEAD:**
  the 0/4/6/10px grab-bag + the cell `0px` + idle C 0.014 + default-band C 0.013 + `backdrop:none`.
- **Self-test bites:** per `DELTA-ASSAY.md §7` (13 planted defects, each must red).

### AUGMENT — `BD.W-TAB-IOS-CAPSULE`
Already AUGMENTed by the tabs §6 amendment (EXTRACT `.glass-capsule`/`-hover`, warm-floor,
EXPOSE `--glass-capsule-fill`, C6 capsule-chroma≥0.02). **This amendment adds ONE line to the
C2 consumer list:** the chip family is a recorded `.glass-capsule` consumer (the ≥4th, after the
tab indicator + the 3 button sites the buttons amendment names). No new capsule work — the chip
just enrolls. Keeps the ≥2-consumer overfit bar satisfied by construction.

### AUGMENT — `BD.W-TINTED-CHIP`
The `--glass-fill-tint` ≥2-consumer ledger (`docs/consumer-evidence/glass-fill-tint.md`) already
books `<IconChip surface=glass>` + the dock facet-chip + the now-playing pill. **This amendment
adds the chip family (`.glass-chip`) as a recorded plate-fill consumer** — strengthening, not
forking, the axis. The `BD.W-TINTED-CHIP` `<GlassChip>` and the chip family's `.glass-chip` are
DISTINCT seams (`<GlassChip>` = the pure colored-glass-plate chip off `--glass-fill-tint` alone;
`.glass-chip` = the accent-tone TOGGLE face that ALSO tints the body via the same axis) — they
COMPOSE the axis, never re-author it. No `<GlassChip>` edit; the dup-check passes (the chip family
reads the axis, defines no `--glass-fill-tint` of its own).

### CROSS-LINK — `BD.W-ICONCHIP-GLASS`
No edit. The chip family's IconChip arm is the radius/φ congruence DELTA ON this wave's glass
register; the glass plate, the `safeAccentColor` filled-glyph, the cluster all stay owned here.
Recorded so the build doesn't double-author the IconChip glass register.

### DEPEND (no edit; sequencing only)
`BD.W-TAB-IOS-CAPSULE` · `BD.W-TINTED-CHIP` · `BD.W-MOTION-WEIGHT` · `BD.W-CARTOON-PUNCH` ·
`BD.W-ICONCHIP-GLASS`.

---

## 2. PRUNE / EXCISE

- **PRUNE: none.** No existing wave is removed (the chip family adds congruence ON TOP of the
  extant `W-TINTED-CHIP`/`W-ICONCHIP-GLASS`/`W-TAB-IOS-CAPSULE` ecosystem).
- **EXCISE from the GOLDEN (folded, not carried into the build):**
  - the §A/§D1/§G3 "**≥4th consumer of `.glass-capsule` … by construction / a UNION with the
    shipped ecosystem**" prose (it's a dependency on the tabs AMENDMENT's extract, not a shipped
    class — reclassified to DEPEND).
  - the §D3/§G3 **`.paper-field` / `W-GLASS-FIELD`** dependency (phantom + mis-named;
    `W-FIELD-ENGINE` is a GPU chunk; the chip transmits whatever field the chassis mounts —
    no chip-owned field primitive).
  - the §J **spike `C 0.050 ✓`** (algebraic token, mislabeled active-as-idle; the painted-π
    defers it).
  - the §E1 **`@property --chip-flood-t { inherits:false }`** + the §E3 `z-index:-1` flood (dead
    on arrival — re-authored to `inherits:true` + above-fill).
  - the §E4 opt-in `cartoon`-loud `::before` + §F2 `useTabIndicator` group glide (DEFERRED to a
    follow-on tabs-convergence wave — scope-creep on the base ask).
  - the §G1 plan to route **IconChip through `.accent-tone` `in oklab`** (regresses the `in srgb`
    brand plate; IconChip keeps its plate + adopts only geometry + `--glass-fill-tint`).

---

## 3. THE NET

**1 NEW wave (`BD.W-CHIP-CONGRUENT-GLASS`) + 2 one-line AUGMENTs (capsule consumer-list +
tinted-chip consumer-ledger) + 1 CROSS-LINK (iconchip-glass) + 5 DEPENDs.** ZERO new glass
material, ZERO new motion register, ZERO new field, ZERO parallel chip — the chip family is the
deft ≥3rd/≥4th consumer of axes the union already ships or has booked. The user's "congruent,
more rounded, glassy" resolves to: ONE stadium radius + the `--glass-fill-tint` warm lens over
the `.glass-capsule` lozenge + the de-frauded colour-flood punch — a UNION, not a bolt-on.
