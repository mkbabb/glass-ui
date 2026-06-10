# AY.W-AUR-STUDIO — aurora studio repair + polish (the dead-select fix, the gate re-skin, the atoms-trap, the oil-pastel β lever)

**Wave** W-AUR-STUDIO — aurora studio repair + polish
· **Repo** glass-ui · **Band** substrate (aurora) · **State** OPEN
· **Kind** demo-source repair + gate re-skin + bounded shader-tuning arm + the dead-pointer re-route
· **Depends on** W-AUR-PAINTERLY (LANDED, `live-verified` DONE_WITH_MISSES — this wave consumes its
  residual: the AX-painterly-statistics gate it left `status:fail`, the dead medium select RA-aurora-config
  + RA-aurora-painterly + HC-aurora all hit, the un-respaced radii lever, and the dead-pointered T5 route)
· **Coordination edges:** the dock README rows are W-DOC1's (no overlap); the §6 T5 re-route MINTS a
  successor row that W-DOC1's aurora §References cleanup must NOT re-cite onto the retired
  `W-AUR-WEBGPU-DECIDE` (record the new owner here so DOC1 re-points off the dead cite).

---

## Defect (source-grounded, file:line — cited from the audit corpus, NOT re-derived)

The aurora studio's slider/preset/clone-persistence machinery is genuinely robust and SOTA-adjacent
(RA-aurora-config §What-is-genuinely-good: 13/13 presets bite, every slider bites, per-preset clone
persistence holds exactly per contract). But a third of the default control surface is **dead to every
user gesture**, the gate built to catch exactly that is itself RED, the per-preset look is silently
discarded on first atom touch, and the one untouched shader lever for the residual β sits un-routed.
Seven defect classes (D1–D7), every one cited from the audit:

### D1 — the FIVE dead dropdown selects (the headline — BROKEN)

Harmony / Arrangement / Medium / Motion (Atoms tab) + Medium (Advanced tab) **cannot be opened by any
user gesture** — `aria-expanded` stays `false`, zero `[role=option]` ever mounts
(RA-aurora-config.md §broken-1, live-verified every gesture: click/Space/Enter/ArrowDown/typeahead;
RA-aurora-painterly.md §5 corroborates on the medium trigger).

**Root cause (read-only diagnosis, confirmed at source):** `LabeledSelect.vue:9-12` binds `isOpen`
as reka's **controlled** `:open` prop and forwards `@update:open` back to the host; the prop is
`required` (`LabeledSelect.vue:52` — `isOpen: boolean`, no default). All FIVE aurora sites pass a
literal `:is-open="false"` and **never handle `@update:open`**, so the select is controlled-shut
forever:

- `AuroraAtomsPanel.vue:165` (Harmony), `:199` (Arrangement), `:224` (Medium), `:249` (Motion)
- `config/MediumLayer.vue:62` (Advanced Medium)

Other demo consumers (`compositions/settings.vue`, `configurator.vue`, `labeled-field.vue`) wire
`v-model:is-open` correctly and work — the component functions; the aurora wiring is the bug, enabled
by a footgun API (a `required` controlled-open prop with no uncontrolled default). This is the
memorized binding-verification defect class (`feedback_glass_ui_binding_verification` — a stale
controlled-prop binding that silently no-ops; vue-tsc + units miss it, only e2e catches).

**Blast radius:** the user cannot change harmony, zone arrangement, medium, or motion; the medium
picker is the headline atom (`AuroraAtomsPanel.vue:46` comment — "ONE medium picker, Title-Cased")
and it is dead chrome. The **Texture slider is therefore UNREACHABLE** — it only renders when
`isTextured` (`AuroraAtomsPanel.vue:96,:231-241` `v-if="isTextured"`), and the only way to a textured
medium is preset selection, never the dead atom.

### D2 — `proof:aurora-atoms-render` is RED against the re-skinned DOM (the gate that exists to prove this defect is itself broken — CLAIM-OVERSTATED)

`tests-visual/aurora-atoms-render.spec.ts` drives **native `<select>` / `<input type=range>`** markup
the LabeledSelect/LabeledSlider re-skin removed (RA-aurora-config.md §broken-2):

- `:100-102` `setRange` → `[data-atom="${atom}"] input[type="range"]` (`.fill()` on a native range)
- `:104-107` `setSelect` → `[data-atom="${atom}"] select` (`.selectOption()` on a native select)
- `:125,:127` the medium drive uses `setSelect("medium", "oil"/"smooth")`

The panel is `LabeledSelect` (reka combobox, `role=button` trigger + `role=listbox`/`role=option`
content — `LabeledSelect.vue:15-34`) and `LabeledSlider` (reka SliderRoot, `role=slider` thumb). The
spec times out at `locator.selectOption` / `input.fill` against markup that does not exist. So
`proof:aurora-atoms-render` attests **nothing** while the defect it was designed to catch (a dead
select atom) is live right now. Born-RED today **by being red**.

### D3 — `proof:aurora-painterly-statistics` is RED against the same re-skin (the SAME class — the unrecorded MISS HC-aurora found)

`tests-visual/aurora-painterly-statistics.spec.ts:121-125` `selectMedium` drives `[data-atom="medium"]
select` (`.selectOption(medium)`) — the same removed native markup. Both viewports (1280 tablet, 1440
desktop) time out at `locator.selectOption`. The committed ledger
`.cache/gates/AX-aurora-painterly-statistics.json` is **`status:fail` at HEAD** with the exact
violation strings recorded (`locator.selectOption: Test timeout of 300000ms exceeded` ×2) —
HC-aurora.md §3 named this as the unrecorded HARD-GATE arm-4 miss of the W-AUR-PAINTERLY close
(RA-aurora-painterly.md §5 corroborates: `[data-atom="medium"] select` matches 0 nodes live). This
gate's four-media-distinct clause (`:184-205`) ALSO uniquely covers **crayon** distinctness, which the
arresting spec's three-stroke-medium pairwise-distinct does not subsume — so re-skinning it is not
redundant with the arresting gate.

### D4 — the atoms-default takeover discards the per-preset look on first touch (data-loss read — UX TRAP)

The first touch of ANY atom replaces the WHOLE per-preset config with the atoms-default resolution
(RA-aurora-config.md §minor-1, delta 255.7 measured; "nudging one Atoms slider on Van Gogh discards
the entire Van Gogh look — a user will read that as data loss"). Root cause at source:

- `AuroraConfigDock.vue:53-61` — the `atoms` reactive is a **fixed wispy-sky default**
  (`seed:"#3a7bd5"`, `harmony:"analogous"`, `medium:{kind:"smooth"}`, …) that **never re-syncs** when
  `selectPreset` swaps `studio.config` (the per-preset live clone, `substrates/aurora.vue:55-67`).
- `AuroraConfigDock.vue:64-70` — `watch(atoms, applyAtoms, {deep:true})` → `applyAtoms()` does
  `Object.assign(props.config, resolveAtoms(atoms))`, copying the default-atoms resolution over the
  active preset's config on the first atom mutation.
- There is `resolveAtoms` (atoms→config, `composables/atoms.ts:303`) but **no `configToAtoms`
  inverse** — so the atoms surface and the preset config diverge silently the moment a preset is
  selected, and the first atom edit clobbers.

This is the §minor note RA flagged but is a real gestalt defect: the atoms surface is structurally
out of sync with the preset it sits beside.

### D5 — the −5/3 radii respacing residue (the un-touched β lever — OWED)

`mediums.glsl.ts:385-387` still reads `sBig = baseScale * 2.4; sMed = * 1.1; sSml = * 0.45`
(+ `sFill = baseScale * 0.22` at `:434`) — byte-for-byte the hand-set values W-AUR-PAINTERLY's
edit-site #2 ("re-space layer radii … −5/3-spaced") targeted (HC-aurora.md §5). The β bands were
landed for van-Gogh + oil via OTHER levers (stroke elongation `mediums.glsl.ts:394-399`, directional
fill, PBR-Neutral tonemap) — the "−5/3-SPIRIT cascade re-spacing" papered over the radii non-move. It
is the **most-relevant untouched lever** for the one β still out of band: **oil-pastel β = −2.53**
(RA-aurora-painterly.md §3, HC-aurora.md §2 live read −2.533; floor −1.85). The respacing is a live
LEVER, not a closed-as-landed row.

### D6 — the T5 residual is a DEAD POINTER (no live owner — DISPOSITION OWED)

The oil/oil-pastel anisotropy residual (oil A=0.36, oil-pastel A=0.66 vs floor 0.732; oil-pastel
β=−2.53) is routed ×4 sites (W-AUR-PAINTERLY-DELTA §Named-successor, `aurora-arresting.spec.ts:27-32`,
the gate-artefact note, `PROGRESS.md:66`) to "T5 anisotropic-Kuwahara, gated on
`AY.W-AUR-WEBGPU-DECIDE`". But **`W-AUR-WEBGPU-DECIDE` closed TERMINAL** (Branch A RETIRE executed;
`W-AUR-WEBGPU-DECIDE-DELTA.md`: "Named successor: NONE — the twin is retired terminally … no scaffold
to resurrect"; the WGSL scaffold is deleted grep-0). The residual materialized AFTER the terminal
close, so it routes into a wave that can no longer receive it — the §4 Class-F/B signature
(HC-aurora.md §4: a prose successor pointer with no machine row). At HEAD the residual has **NO live
owner**.

### D7 — the gate-robustness residue (HC-aurora §2a/§2b — the foreign-server clobber + the razor-thin margin)

- **Foreign-server silent-skip clobber** (HC-aurora.md §2a): the skip/fail discrimination in
  `aurora-arresting.spec.ts:134-141` keys SOLELY on `canvas.aurora-canvas` presence. When a DIFFERENT
  project's vite server holds the port (`reuseExistingServer`, `playwright.config.ts:89`), the spec
  attaches to it, the aurora canvas never appears, and it takes the device-absence skip
  (`:140` `test.skip(true, "aurora-canvas absent")`) — OVERWRITING the committed `status:pass` with
  `status:skipped` on a real-GPU machine. The same hole exists in the re-skinned atoms-render /
  painterly-statistics specs (canvas-presence is their only liveness gate too). Cannot distinguish
  "no GPU" from "wrong app on the port".
- **Razor-thin margin, undocumented** (HC-aurora.md §2b): van-Gogh A=0.7332 clears the 0.732 floor by
  **0.0012**; β=−1.809 clears the −1.85 edge by 0.041 — a margin this thin on a hard close gate (made
  hotter by the §2a clobber) deserves a recorded flake-risk disclosure the W-AUR-PAINTERLY DELTA omits.
- **The ≥1280px capture clause** (HC-aurora.md §1b): the W-AUR-PAINTERLY PNGs are 932×701 (the canvas
  crop inside a 1440×900 viewport), below the spec's `≥1280px` clause. The honest fix is to amend the
  clause OR re-capture at a viewport yielding a ≥1280px canvas — recorded here so this wave's re-skin
  re-capture (it must re-run the gates to flip the ledgers) lands the dimension clause right.

---

## Goal criterion

The five dropdown selects open and bite on every user gesture; the medium atom drives van-Gogh /
oil-pastel / oil live and the Texture slider becomes reachable; `proof:aurora-atoms-render` AND
`proof:aurora-painterly-statistics` flip from `status:fail` to `status:pass` against the re-skinned
DOM on the real Metal GPU; a preset's look survives the first atom touch (the atoms surface seeds FROM
the active preset's resolution, not a fixed default); the oil-pastel β residual has either moved into
band via the live radii lever OR is recorded as the named candidate for a LIVE-OWNED successor; and the
T5 residual has a born-RED machine row with a live owner (the dead `W-AUR-WEBGPU-DECIDE` cite is
re-pointed at all four sites). No gate keys liveness on canvas-presence alone (a served-app sentinel
fails-not-skips when the wrong app is on the port).

## Completion criterion

The HARD GATE below is GREEN: the five `:is-open="false"` literals are gone (deletion-proof), the two
re-skinned gates run PASS on the real GPU and their committed ledgers flip `fail`→`pass`, the
atoms-seed-from-preset round-trip is asserted live (a preset's config survives a single atom touch
within drift), and the served-app sentinel fails-closed on the wrong app.

---

## Scope fence (what this wave does NOT do)

- It does NOT change the painterly SHADER math beyond the bounded D5 radii arm (one lever, one
  re-measure). The multi-pass anisotropic-Kuwahara finish is OUT (the WebGPU resurrect path is DEAD —
  §6 routes it to a FRESH named successor, NOT this wave).
- It does NOT touch the dock/blob/constellation READMEs (W-DOC1 owns them) — but it MINTS the T5
  successor row + re-points the four dead `W-AUR-WEBGPU-DECIDE` cites, which W-DOC1's aurora
  §References cleanup must read (coordination edge recorded above).
- It does NOT alter the `LabeledSelect` public API (the `required isOpen` footgun is real but a
  library-API change is out of this demo-repair scope; the fix is wiring `v-model:is-open` at the five
  consumer sites — the same shape every working consumer already uses). A note routes the footgun to
  W-DOC1 / a forms-hardening successor as a "consider an uncontrolled-open default" candidate, NOT a
  blocker here.

---

## Edit sites (exact)

| # | File | Site | Edit |
|---|---|---|---|
| 1 | `demo/stories/aurora/AuroraAtomsPanel.vue` | `:165` (Harmony) | replace `:is-open="false"` with `v-model:is-open` bound to a per-select `ref<boolean>` (or a single `openId` discriminator) — the select must round-trip its own open state |
| 2 | `demo/stories/aurora/AuroraAtomsPanel.vue` | `:199` (Arrangement) | same `v-model:is-open` wire |
| 3 | `demo/stories/aurora/AuroraAtomsPanel.vue` | `:224` (Medium) | same `v-model:is-open` wire — the headline atom; this also makes the Texture slider reachable (`:231-241` `v-if="isTextured"` now reachable via a textured medium pick) |
| 4 | `demo/stories/aurora/AuroraAtomsPanel.vue` | `:249` (Motion) | same `v-model:is-open` wire |
| 5 | `demo/stories/aurora/config/MediumLayer.vue` | `:62` (Advanced Medium) | same `v-model:is-open` wire |
| 6 | `tests-visual/aurora-atoms-render.spec.ts` | `:99-114` (`setRange`/`setSelect`/`setColor`) | RE-POINT the drivers to the reka markup: the medium select opens via its `[data-atom="medium"]` trigger (`role=button`/`SelectTrigger`) → click → `[role="option"]` by text; the sliders drive via the reka thumb (`role=slider` keyboard `ArrowRight`/`Home`/`End` or a `fill`-equivalent on the thumb) OR via the `@update:model-value` path the panel exposes. Keep the `data-atom` anchors (they survive the re-skin — verified `AuroraAtomsPanel.vue:152,:168,:178,:191,:203,:215,:227,:239,:252`) |
| 7 | `tests-visual/aurora-painterly-statistics.spec.ts` | `:121-125` (`selectMedium`) | RE-POINT to the reka select interaction (trigger-click → option-by-text under `[data-atom="medium"]`) OR — the more robust path the arresting spec already proves — drive medium via the PRESET buttons (`button[aria-pressed]` + hasText) when a preset pins each medium; pick the path that keeps the four-media-distinct + crayon clause intact |
| 8 | `tests-visual/aurora-arresting.spec.ts` + the two re-skinned specs | the canvas-wait block (`aurora-arresting.spec.ts:134-141` + the equivalents in atoms-render `:79-84` / painterly-statistics `:137-140`) | INSERT a served-app SENTINEL before the canvas wait: assert the served page IS the glass-ui demo (a known root selector / `<title>` / a `[data-aurora-atoms-surface]` presence with a distinct FAIL message) and **FAIL, not skip**, when it is not — closing the §2a foreign-server clobber. The device-absence skip stays ONLY when the served page IS the demo but the canvas never paints (true GPU-less) |
| 9 | `demo/stories/aurora/AuroraConfigDock.vue` | `:53-70` | the D4 atoms-trap fix (DISPOSITION below, §"Atoms-trap disposition") — seed `atoms` FROM the active preset's resolution on `selectPreset`, via a `configToAtoms` derivation, so the first atom touch refines rather than clobbers |
| 10 | `src/components/custom/aurora/composables/atoms.ts` | after `:303` (`resolveAtoms`) | NEW `configToAtoms(config): AuroraAtoms` — the inverse derivation the seed-from-preset fix needs (the minimal field set: seed/harmony/colorEnergy/zones/noise/medium-kind+amount/motion). Export it; it has ≥2 sites (the dock seed + the round-trip gate) so it clears the overfitting bar |
| 11 | `src/components/custom/aurora/constants/shaders/mediums.glsl.ts` | `:385-387` (+ `:434`) | the D5 bounded radii arm (DISPOSITION below, §"Radii arm") — re-space `sBig/sMed/sSml` toward the −5/3 geometric ratio IF it moves oil-pastel β into band without regressing van-Gogh/oil; re-measure via `proof:aurora-arresting`; record the achieved triple |
| 12 | `PROGRESS.md` + `tests-visual/aurora-arresting.spec.ts:27-32` + the gate-artefact note + `W-AUR-PAINTERLY-DELTA.md §Named-successor` | the four T5-route cites | the §6 dead-pointer re-route (DISPOSITION below) — re-point off `W-AUR-WEBGPU-DECIDE` onto the live owner this wave records |

---

## Atoms-trap disposition (D4 — the gestalt fix, recorded)

Three options were weighed:

1. **Seed atoms FROM the active preset's resolution** (a `configToAtoms` inverse runs on `selectPreset`,
   so the atoms surface always reflects the live preset; the first atom touch refines the preset rather
   than clobbering it).
2. **A confirm affordance** ("editing atoms will reset to the atom defaults — continue?") gating the
   first touch.
3. **Keep + document** (a prose note in the panel that atoms are a from-scratch surface).

**PICK (1) — seed-from-preset.** Rationale (gestalt over patch, per `feedback_architectural_approach`):
the trap is a STRUCTURAL divergence — the atoms surface and the preset config are two unsynced sources
of truth (`AuroraConfigDock.vue:53-61` fixed default never re-syncs). A confirm dialog (2) papers over
the divergence with a speed-bump; keep-and-document (3) leaves a surface that lies about the field it
sits beside. Seed-from-preset (1) makes the atoms surface a TRUE projection of the live config: select
Van Gogh → the medium atom reads "Van Gogh", the seed swatch reads its palette base, and nudging
energy refines Van Gogh instead of discarding it. This is the same per-preset-fidelity model the
configurator's `cloneMode:"per-preset"` already commits to (`substrates/aurora.vue:55-58`) — the atoms
surface joins that contract instead of standing outside it. The `configToAtoms` inverse (edit-site 10)
is the minimal addition; it is lossy by design (atoms are a ≤7-knob projection of a ~28-field config —
the projection is the point), and the seed runs on preset-select so an Advanced-tab edit is NOT
round-tripped back to atoms (the Advanced escape hatch stays the full-fidelity surface).

---

## Radii arm disposition (D5 — bounded, falsifiable)

`mediums.glsl.ts:385-387` `sBig/sMed/sSml` at `2.4 / 1.1 / 0.45` is a `≈2.18× / 2.44×` step ratio. A
true −5/3 (φ-adjacent) geometric respacing would set the three primary radii on a fixed ratio
(candidate: `2.4 / 1.45 / 0.87` ≈ `1.66×` steps, the −5/3 spacing the matrix named). The arm is
BOUNDED + FALSIFIABLE:

- Apply the respacing, re-run `proof:aurora-arresting` on the real GPU, read the achieved triple per
  medium.
- **KEEP the respacing ONLY IF** oil-pastel β moves into band (≥ −1.85) AND van-Gogh + oil stay in
  their landed bands (no regression below the W-AUR-PAINTERLY-landed C/A/β). Record the before/after
  triples in the DELTA.
- **IF the respacing does NOT move oil-pastel β into band** (the single-pass ceiling is the true
  limiter, as HC-aurora §5 anticipates), record that measured result and ROUTE the oil-pastel β
  residual to the §6 live successor as the named candidate the multi-pass operator must finish — do
  NOT silently strike the matrix row.

Either branch is a recorded outcome, not an open lever.

---

## T5 dead-pointer re-route (D6/§6 — the live owner)

The oil/oil-pastel anisotropy residual (oil A=0.36, oil-pastel A=0.66; oil-pastel β=−2.53, possibly
moved by the D5 arm) needs a LIVE owner. The disposition (gestalt, recorded):

**MINT a fresh named successor `AY.W-AUR-T5` (multi-pass anisotropic-Kuwahara, greenfield) — the
consumer now EXISTS and is this residual.** This is exactly what the `W-AUR-WEBGPU-DECIDE` RETIRE DELTA
said the path forward was ("any future WebGPU work opens fresh with a named consumer … no scaffold to
resurrect"). The WebGPU-resurrect path is **explicitly DEAD** — `AY.W-AUR-T5` is a fresh WebGL2-or-FBO
multi-pass wave, not a resurrection; it carries its own scaffold and its own born-RED gate. It is
`planned` (spec-stub authored by the orchestrator), gated on a USER-HINGE: *the multi-pass finish is a
real-cost lane (a second FBO pass + a Kuwahara operator) — the user decides whether the single-pass
A/β ceiling on oil/oil-pastel is accepted as the permanent register OR the multi-pass cost is spent*.
That USER-HINGE row is surfaced at close per NECESSITY-MATRIX §2.

**Re-point the four dead cites** off `W-AUR-WEBGPU-DECIDE` onto `AY.W-AUR-T5` (edit-site 12):
`PROGRESS.md:66`, `aurora-arresting.spec.ts:27-32`, the gate-artefact note, and
`W-AUR-PAINTERLY-DELTA.md §Named-successor`. W-DOC1's aurora §References cleanup reads this re-route
(coordination edge) so it does NOT re-cite the retired wave.

---

## Hard gate

`proof:aurora-studio` (new fail-closed gate, `scripts/proof-aurora-studio.mjs`, wired into
`package.json` + `proof:all`, run by CI on the real-GPU arm) is GREEN, asserting ALL of:

1. **DEAD-SELECT DELETION-PROOF.** ZERO `:is-open="false"` literal across the five sites
   (`AuroraAtomsPanel.vue` ×4 + `config/MediumLayer.vue` ×1) — every `LabeledSelect` in the aurora
   studio binds `v-model:is-open` (a re-introduced hard `:is-open="false"` flips RED). Born-RED today:
   five literals exist at HEAD (`grep -c ':is-open="false"' demo/stories/aurora/**` = 5).

2. **SELECTS-OPEN LIVE (π — the binding truth).** On the real Metal GPU at `/substrates/aurora`: click
   the medium select trigger → assert ≥1 `[role="option"]` mounts (`aria-expanded`→`true`); pick an
   option by text → assert the canvas interior changes above the drift floor (the same
   mean-channel-delta readback the atoms-render spec uses) AND the Texture slider becomes reachable
   (`[data-atom="texture"]` present after a textured-medium pick). Born-RED today: zero options ever
   mount (RA-aurora-config §broken-1, live-verified).

3. **RE-SKINNED GATES FLIP `fail`→`pass`.** `proof:aurora-atoms-render` AND
   `proof:aurora-painterly-statistics` run PASS on the real GPU against the re-skinned DOM, and their
   committed ledgers flip from `status:fail` to `status:pass`. Born-RED today:
   `.cache/gates/AX-aurora-painterly-statistics.json` is `status:fail` with the recorded
   `locator.selectOption` timeout (×2); the atoms-render spec times out at `input.fill` / `selectOption`
   against absent native markup.

4. **ATOMS-SEED-FROM-PRESET ROUND-TRIP (π).** On the real GPU: select a distinctive preset (Van Gogh),
   assert the medium atom reads its medium (`mediumLabel`→"Van Gogh") AND the canvas; touch ONE atom
   (nudge energy by one step); assert the canvas stays within drift of the preset (the per-preset look
   SURVIVES — NOT the 255.7 clobber-delta RA measured). Born-RED today: the first atom touch clobbers
   to the atoms-default resolution (`AuroraConfigDock.vue:64-70`, RA §minor-1 delta 255.7).

5. **SERVED-APP SENTINEL FAILS-CLOSED.** A unit-level canary (born-RED→GREEN detector test) proves the
   sentinel block FAILS (not skips) when the served page is NOT the glass-ui demo (a planted wrong-root
   fixture) AND skips ONLY when the demo IS served but the canvas never paints. Born-RED today: the
   skip/fail discrimination keys solely on canvas-presence (`aurora-arresting.spec.ts:134-141`), so a
   foreign server clobbers `status:pass`→`status:skipped` (HC-aurora §2a).

6. **D5/D6 OUTCOMES RECORDED (deletion-proof on the dead cite).** ZERO `W-AUR-WEBGPU-DECIDE` cite in
   the four T5-route sites (re-pointed to `AY.W-AUR-T5` — `grep` enumerates the sites at run time); AND
   the DELTA records the D5 radii before/after triples (the achieved-band measurement, kept-or-routed).

**Evidence class:** deletion-proof (clauses 1, 6) + live π readback on the real GPU (clauses 2, 4) +
ledger-flip from the committed `status:fail` artefact (clause 3) + a born-RED→GREEN detector canary
(clause 5). NOT grep-only — clauses 2/3/4 are runtime canvas readbacks on the Metal GPU; clause 3
asserts the on-disk ledger transitioned. The gate is reproducible (`npm run proof:aurora-studio` →
exit 0) and fail-closed (a re-introduced `:is-open="false"`, a re-stale gate selector, a re-clobbering
atoms watcher, or a re-pointed dead cite flips it RED).

---

## Named successor (on miss)

- **D1/D2/D3 miss** (a select stays dead or a re-skinned gate stays RED): re-opens THIS wave — these
  are the load-bearing repairs; the wave does not close until clauses 1-3 are GREEN on the real GPU.
- **D4 miss** (the seed-from-preset round-trip can't hold within drift — e.g. a config field the
  atoms projection can't represent): fall back to disposition (2) the confirm affordance for that field
  ONLY, recorded; the successor is THIS wave (re-spin), not a handoff.
- **D5 miss** (the radii respacing does NOT move oil-pastel β into band): RECORD the measured result;
  the oil-pastel β residual ROUTES to `AY.W-AUR-T5` as the named multi-pass candidate (the matrix row
  re-grades from "land the respacing" to "the candidate lever, ceiling confirmed", NOT struck).
- **D6 miss** (the T5 residual is not picked up): `AY.W-AUR-T5` is the named live owner (greenfield
  multi-pass, WebGPU-resurrect explicitly DEAD), gated on the recorded USER-HINGE (accept the
  single-pass ceiling vs spend the multi-pass cost). The four cites re-point onto it; W-DOC1 reads the
  re-route.
- **D7 miss** (the sentinel or the ≥1280px clause): the sentinel is clause 5 (this wave); the ≥1280px
  capture clause amends in THIS wave's re-capture (it re-runs the gates) — HC-aurora §1b's "amend the
  clause to the honest as-built OR re-capture at a ≥1280px-canvas viewport" is resolved here, recorded
  in the DELTA.

## Cross-references

- RA-aurora-config.md §broken-1 (five dead selects, root cause), §broken-2 (atoms-render RED),
  §minor-1 (atoms-takeover), §robustness-scorecard.
- RA-aurora-painterly.md §5 (medium switcher dead UI + painterly-statistics 0-node corroboration),
  §3 (oil-pastel β=−2.53 residual).
- HC-aurora.md §2a (foreign-server clobber), §2b (razor-thin margin), §1b (≥1280px clause), §3 (the
  unrecorded HARD-GATE arm-4 miss — painterly-statistics `status:fail`), §4 (T5 dead pointer), §5
  (−5/3 radii owed, `mediums.glsl.ts:385-387`).
- `feedback_glass_ui_binding_verification` (the stale controlled-prop binding class — D1).
- `feedback_architectural_approach` (gestalt over patch — the D4 seed-from-preset pick).
- W-DOC1 coordination: the T5 re-route MINTS `AY.W-AUR-T5`; W-DOC1's aurora §References cleanup
  (`AY.W-DOC1.md` edit-site 15 / D5.A5) must NOT re-cite the retired `W-AUR-WEBGPU-DECIDE`.
