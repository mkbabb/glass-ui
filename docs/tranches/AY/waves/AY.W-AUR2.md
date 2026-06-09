# AY.W-AUR2 — Aurora residue sliver (the no-op strike: migration/atoms DONE; the derive-color prop only)

**Tranche** AY (glass-ui) · **Wave** W-AUR2 · **Track** aurora · **Type** doc-reconcile + (conditional) impl
· **Band** A (SOTA component perfection) · **State** OPEN · **HEAD** `at-dock-convergence`
· **Source risk** ZERO on the doc arm; ≤1 prop on the conditional impl arm (no behaviour delta —
the composable already ships)

---

## Defect (file:line, source-grounded)

W-AUR2 as the AY plan carries it (`AY.md:55,145`) **triple-counts ALREADY-LANDED work**. The
corpus directive folded at `AY.md:55` reads "aurora SOTA (OKLAB/OKLCH; … simplify; derive-color)"
and the §2 row at `AY.md:145` says "The RESIDUE sliver ONLY". But three of its named objectives
SHIPPED at AX W07-W14 and are GATE-LOCKED at HEAD — verified this pass against live source:

1. **The FULL OKLAB/OKLCH in-shader migration is DONE.**
   - `constants/shaders/aurora.frag.ts:308` — the comment header on the colour-utils block reads
     *"OKLCh — W5; the sRGB YIQ hueShift matrix is DELETED"*. The legacy sRGB YIQ hue-rotation
     matrix is GONE (`:319-320` records the prior "YIQ-style sRGB rotation muddied value" path it
     replaced).
   - `constants/shaders/composition.glsl.ts:21` — `samplePalette` routes through the shared
     `samplePaletteRamp` (the OKLab-rectangular ramp + the OKLCh hue-arc dispatch on `uHuePath`),
     SPLICED from `procedural-color.glsl` (`composition.glsl.ts:11-12`). The interpolation is
     perceptual; the ONLY sRGB step is the palette ENDPOINTS baked CPU-side to linear-sRGB (the
     Aras precompute, `aurora.frag.ts:15,63`) — there is **no in-shader sRGB colour lerp left to
     migrate**.
   - `brokenColorJitter` is OKLCh hue/chroma jitter at fixed perceptual lightness
     (`aurora.frag.ts:318-325`).
   - **Evidence it is gated:** `proof:aurora-oklch-interp` (`package.json:611`) +
     `proof:aurora-space-gamma` (`package.json:610`).

2. **The ≤7-atom door simplification is DONE — and the named `mood` atom was DELIBERATELY collapsed.**
   - `composables/atoms.ts:89-127` is EXACTLY the ≤7-atom door the directive asks for: COLOR
     (`seed` + `harmony` + `colorEnergy`), ZONES (`zones`), NOISE (one knob), MEDIUM (`medium`),
     MOTION (`motion`), interactivity. `DEFAULT_ATOMS` (the empty set, `atoms.ts:134`) deep-equals
     `DEFAULT_AURORA_CONFIG`.
   - The corpus's named `mood` element was **folded into `colorEnergy`'s `temperatureShift`** —
     `atoms.ts:154` literally annotates the temperature pole *"the palette warm/cool coupling
     (folded from the old mood recipe)"*, and `atoms.ts:96-101` documents `colorEnergy` as the one
     scalar that co-varies the entangled chroma/value/temperature cluster. So W-AUR2's literal
     atom list "(seed/harmony/**mood**/medium/zones/motion)" cites a **stale element** — `mood`
     was deliberately subsumed, not omitted.
   - **Evidence it is gated:** `proof:aurora-atoms-roundtrip` (`package.json:619`; TOTAL +
     DEFAULT-PRESERVING per the atoms.ts header).

3. **The `derive-color` composable is DONE.**
   - `composables/color.ts:169` exports `deriveAurora(seed, options): OklchStop[]` — a thin
     composing producer over the value.js Ottosson core (`color.ts:154-167`); the `W5`
     `DeriveAuroraOptions` superset (`color.ts:123-144` — harmonies + L/C/h spreads + easing +
     `temperatureShift`) is its options bag.
   - Exported via `aurora/index.ts:47,59` AND on the discovery surface `api/index.ts:52`.
   - Consumed by the atoms COLOR door (`atoms.ts` imports `deriveAurora` — verified) and by
     `composables/color.ts` itself.

The **only net-new sliver** is the ergonomic question Finding 5 named (`H-aurora.md:125-127`):
`deriveAurora` is a COMPOSABLE, not an `Aurora.vue` prop. `Aurora.vue` `defineProps`
(`Aurora.vue:41-84`) carries `config`, `runtimeOptions`, `onInitError`, `renderMode`,
`opacityCeiling` — **no `deriveColor`/`derive-color` prop exists** (verified). So the residue is:
DECIDE whether a one-prop `<Aurora derive-color="…">` shortcut is wanted over the existing
composable, and strike the stale `mood` mention + the net-new framing.

This is the precept-drift signature `H-precept-drift.md` names (greenfield-no-meta /
accurate-status): a wave that re-builds passing, gated code because the plan does not see its own
base. The fix is a re-scope, not an implementation.

---

## Goal criterion

W-AUR2 reads as what it actually is — a **doc reconciliation** that strikes the OKLAB/OKLCH
migration, the atoms door, and the `deriveAurora` composable as DONE (citing the three EXISTING
proof gates as the evidence the objective is already met), strikes the stale `mood` atom mention,
and resolves the ONE genuine open question — the `<Aurora derive-color>` prop ergonomic — by
either SHIPPING it (≥1 named consumer + the prop on `defineProps`) or RETIRING it with rationale
(the composable suffices; a prop would be substrate-without-consumer). A fresh reader of `AY.md`
finds no claim that the migration/atoms/composable are net-new AY work.

## Completion criterion

`AY.md:145` (and this spec) carry NO net-new claim for the migration/atoms/composable; the three
gates `proof:aurora-oklch-interp` + `proof:aurora-space-gamma` + `proof:aurora-atoms-roundtrip` are
named as the EXISTING evidence; the stale `mood` token is struck; and the prop sliver is in a
terminal state (SHIPPED with a passing prop unit + ≥1 consumer, OR RETIRED with the rationale
recorded). The `proof:ay-w0-reground` ledger meta-gate (W0-REGROUND) stays GREEN over the row
(no stale label re-introduced). See HARD GATE.

---

## Edit-sites (exact)

### Arm 1 — the doc strike (ALWAYS; the wave's primary content)

1. **`docs/tranches/AY/AY.md:55`** — the §0 directive-fold row. Re-word the disposition so it
   does NOT imply W-AUR2 implements the migration/atoms/derive-color. Strike the framing that
   reads "aurora SOTA (OKLAB/OKLCH; … simplify; derive-color)" as W-AUR2 scope; route those three
   to §0.1 SHIPPED-DO-NOT-REBUILD (where `AY.md:87` already records them as DONE with the gate
   citations) and leave W-AUR2 pointing only at the prop sliver.

2. **`docs/tranches/AY/AY.md:145`** — the W-AUR2 §2 row. Replace the scope/gate cells so they:
   - state explicitly the OKLAB/OKLCH migration + atoms door + `deriveAurora` composable are
     **struck as DONE per §0.1** (cite `composition.glsl.ts:21`, `atoms.ts:89-127`,
     `aurora.frag.ts:308`, `color.ts:169`);
   - **strike the stale `mood` atom mention** — the literal `mood` token is removed; the row notes
     `mood` was folded into `colorEnergy`/`temperatureShift` (`atoms.ts:154`);
   - name the EXISTING gates (`proof:aurora-oklch-interp`, `proof:aurora-space-gamma`,
     `proof:aurora-atoms-roundtrip`) as the evidence the objective is already met;
   - reduce the live scope to the `<Aurora derive-color>` prop DECISION only.

3. **`docs/tranches/AY/audit/AUDIT-LEDGER.md`** — the aurora migration/atoms/derive-color row.
   Confirm it reads `DONE-VERIFY` (per W0-REGROUND `AY.md:87`) and that the narrow residue is the
   ARTISTIC bar (→ W-AUR-PAINTERLY) + this prop sliver — NOT the migration. (The ledger was
   already re-stamped at W0-REGROUND; this is a verify, not a re-author.)

### Arm 2 — the prop DECISION (one of two terminal branches)

DECIDE on the `≥2-consumer` bar (the overfitting precept; `H-aurora.md:126-127`). The composable
`deriveAurora` already gives consumers the seed→palette path; the atoms COLOR door already gives
the declarative form. A prop is warranted ONLY if a consumer wants the one-liner
`<Aurora derive-color="oklch(...)" />` without composing the palette themselves.

**Branch SHIP** (only if ≥1 real consumer route is NAMED — e.g. a slides hero or a demo
`/substrates/aurora` route that would use the shortcut):
- **`src/components/custom/aurora/Aurora.vue:41-84`** — add an OPTIONAL prop to `defineProps`:
  `deriveColor?: string | OklchStop` (and optionally `deriveOptions?: DeriveAuroraOptions`).
  When set, derive the palette via `deriveAurora(props.deriveColor, props.deriveOptions)` and
  feed it into the effective `config.palette` (compose, do NOT mutate the passed `config` — mirror
  the `withDefaults` factory discipline at `Aurora.vue:85-92`). `config` stays the escape hatch;
  `deriveColor` is the ergonomic shortcut. NO behaviour delta when the prop is absent (the
  `DEFAULT_AURORA_CONFIG` path at `Aurora.vue:89` is byte-identical).
- **`tests/components/custom/aurora/aurora-derive-color.test.ts`** (NEW) — assert
  `<Aurora deriveColor="oklch(0.6 0.15 30)">` resolves to the SAME palette `deriveAurora(...)`
  returns (the prop is a thin pass-through, no re-implementation — inv J-10).
- The named consumer route adopts the prop (the ≥2-consumer evidence: the composable + the prop's
  consumer = 2 sites of the derive path).

**Branch RETIRE** (the default if no consumer route is named):
- NO `Aurora.vue` edit. Record in `AY.md:145` + the AUDIT-LEDGER aurora row that the
  `<Aurora derive-color>` prop is RETIRED: the `deriveAurora` composable + the atoms COLOR door
  already serve every known consumer; a prop with no second consumer is substrate-without-consumer
  (`L invariant 8` / the overfitting bar). The seed→palette ergonomic stays the composable.

---

## HARD GATE (evidence-backed)

The wave closes GREEN on a **doc-reconciliation artefact** + the prop's **terminal-state proof**:

**(G1) The doc strike — explicit reconciliation (the primary gate).**
`AY.md:55` and `AY.md:145` no longer claim the OKLAB/OKLCH migration, the atoms door, or the
`deriveAurora` composable as net-new W-AUR2 work, AND the stale `mood` ATOM-LIST MEMBER is struck
wherever a prior plan/spec enumerated it as a live atom. **Verifiable artefact:** a diff of `AY.md`
(the build-diff / explicit document-reconciliation hard-gate kind, `TRANCHE-AND-WAVE-SPEC.md
§"Hard gate"`) showing the three items moved to / cited as §0.1-SHIPPED.

**The falsifiable grep (scoped — NOT the self-referential bug).** The strike target is `mood` as an
ATOM-LIST ENUMERATION (`seed/harmony/mood/medium/zones/motion` and the like), NOT the instruction
text "strike the stale `mood` atom mention" (which legitimately NAMES the token it is striking) and NOT
the unrelated `/substrates/blob-mood` demo route at `AY.md:149`. The binding check is:
`grep -nE "harmony[/, ]+mood|mood[/, ]+(medium|zones|motion)" docs/tranches/AY/AY.md docs/tranches/AY/waves/AY.W-AUR2.md`
returns **0** for any LIVE atom enumeration (a quoted "cites a **stale element**" call-out that flags
`mood` as removed is permitted; a live `(seed/harmony/mood/...)` claim is not). At HEAD `AY.md` carries
NO such live enumeration (verified: the only `mood` hits are AY.md:145 the strike-instruction and
AY.md:149 `blob-mood` — both legitimate), so the AY.md half of G1 is already SATISFIED; the residual is
to confirm no spec/doc re-introduces the live `mood` atom enumeration.

The three EXISTING gates (`proof:aurora-oklch-interp`, `proof:aurora-space-gamma`,
`proof:aurora-atoms-roundtrip`) are NAMED in the row as the evidence the migration/atoms objective is
already met.

**(G2) The EXISTING gates green (the "already met" evidence, not net-new work).**
`npm run proof:aurora-oklch-interp && npm run proof:aurora-space-gamma && npm run
proof:aurora-atoms-roundtrip` all exit 0 at HEAD — cited as the proof the struck objectives ARE
satisfied (this is verification of the already-landed state, NOT a new gate this wave authors).

**(G3) The prop sliver in a terminal state (deletion-proof OR ship-proof).**
EXACTLY ONE of:
- **RETIRE (default):** `grep -n "deriveColor\|derive-color" src/components/custom/aurora/Aurora.vue`
  → **0** (no prop minted), AND the retirement rationale (composable + atoms door suffice; no 2nd
  consumer) is recorded in `AY.md:145` + the AUDIT-LEDGER aurora row. The deletion-proof IS the
  artefact (the absence is the evidence, paired with the recorded rationale — the
  ≥2-consumer-bar disposition).
- **SHIP (only with a named consumer):** `deriveColor?` is on `Aurora.vue` `defineProps`;
  `npm run typecheck` (`vue-tsc --noEmit`) green; the new prop unit
  (`tests/components/custom/aurora/aurora-derive-color.test.ts`) passes asserting the prop's
  resolved palette === `deriveAurora(...)` (the no-re-implementation, no-behaviour-delta proof);
  the named consumer route is recorded as the 2nd derive-path site.

**(G4) The ledger meta-gate stays green.** `npm run proof:ay-w0-reground` (the re-ground meta-gate
**MINTED by `AY.W0-REGROUND`** — modeled on the existing `proof:au-w0-reground` at `package.json:578` /
`gates.mjs:187`; it does NOT exist at HEAD until W0-REGROUND lands it, so this clause is a DEPENDENCY
read, not a W-AUR2-authored gate) exits 0 — the aurora migration/atoms row carries no re-introduced stale
label and keeps its `DONE-VERIFY` status with the gate citations. (Dependency: W-AUR2's row reconcile
must land BEFORE `proof:ay-w0-reground` is wired into `proof:all`, else the gate REDs on the un-reconciled
row — sequence W0-REGROUND mints the gate, the aurora-row waves reconcile, then the gate goes green.)

**Why this gate, not grep-alone:** G1 is an explicit-document-reconciliation gate (an allowed
hard-gate kind), backed by a build-diff of `AY.md` + a SCOPED falsifiable `grep` for a LIVE `mood`
atom-enumeration (the scoped pattern excludes the strike-instruction text and the `blob-mood` route —
the prior unscoped `grep "mood" AY.md` was self-referentially un-failable because the W-AUR2 row itself
names the token; the corrected pattern can actually RED on a re-introduced live enumeration). G2 cites
RUNTIME gate output (the migration/atoms ARE the runtime feature; their existing proof scripts at
`package.json:611,612,621` are the artefact). G3 is a deletion-proof (RETIRE) or a focused unit +
typecheck (SHIP) — never an "API exists" claim. G4 reads the W0-REGROUND-minted meta-gate (a dependency,
not authored here). The wave does not invent a new runtime gate because there is no net-new runtime
feature on the doc arm — that is the whole point of the strike.

---

## What this wave does NOT do (scope fence)

- It does **NOT** touch the in-shader migration, the atoms door, or `deriveAurora` — those SHIPPED
  at AX W07-W14 and are gated. Re-building them is exactly the mis-route W0-REGROUND prevents.
- It does **NOT** carry the ARTISTIC "stunning/arresting/van-Gogh" bar — that is W-AUR-PAINTERLY
  (the born-RED `proof:aurora-painterly-statistics` + the captured painterly-medium DELTA,
  `AY.md:146`). W-AUR2 is purely the migration/atoms/derive-color residue.
- It does **NOT** carry the WebGPU twin decision — that is W-AUR-WEBGPU-DECIDE (`AY.md:147`).
- It does **NOT** mint a parallel derive path. If the prop ships, it is a thin pass-through to the
  EXISTING `deriveAurora` (inv J-10: no colour math re-implemented).

## Named successor (on miss)

- If the prop decision cannot resolve cleanly (a consumer route is proposed but not yet real), the
  prop is RETIRED with a `{trigger}`-tagged disposition in the AUDIT-LEDGER (the
  consumer-route-arrives trigger), per the ≥2-consumer bar — never a bare "deferred". The doc
  strike (G1/G2/G4) still closes; only G3's SHIP branch books behind the trigger.
- The artistic residue is NOT a W-AUR2 miss — it is W-AUR-PAINTERLY by design.
