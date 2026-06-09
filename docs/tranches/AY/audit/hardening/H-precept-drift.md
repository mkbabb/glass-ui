# H-precept-drift — adversarial hardening of the AY/L plans against the house keeps

**Lane:** H (precept drift). **Verdict:** GAPS-FOUND.
**Scope challenged:** in-srgb tint keep, `cn()` keep, `.focus-ring` keep, greenfield-no-meta,
clean-break (renames sweep ALL consumers incl. tests), cartoon-shadow, easing doctrine, squircle
policy, no-backwards-compat, the cross-repo-dev-resolution contract — across AY (glass-ui, 22 waves)
+ L (slides, 10 waves). NO code edits; findings + wave-spec inputs only.

## Executive read

The AY/L plans do NOT smuggle quick-fixes, and they leave every CSS-cascade house keep
UNDISTURBED (in-srgb tint, `cn()`, `.focus-ring`, cartoon-shadow, easing doctrine — none are
mentioned in either plan, which is correct; they are settled identity keeps, not work). The
real drift is a different precept: **greenfield-no-meta + accurate-status discipline**. The AY
plan and its AUDIT-LEDGER were authored against a STALE read of what AX actually shipped
(the "Workflow stale-worktree trap" the user's own MEMORY flags). Multiple AX-LIVE-VERIFIED
deliverables are re-listed in AY as UNADDRESSED / DEFERRED, and several AY waves re-mint a gate
or artefact that already ships. This is the precept-drift signature: a plan that does not see
its own base.

Secondary findings: one genuine clean-break under-spec (the slider rename blast radius), two
under-specced research-wave hard gates (the unbound `≥N`), the L convergence headline wave
(L.W-ADOPT) has no wave spec + a stale resolution-gate premise, and an internal squircle-policy
inconsistency AY inherits via the AX close.

---

## FINDINGS (source-grounded)

### F1 — STALE-BASE DRIFT: the warp ask is shipped, not "UNADDRESSED" (greenfield-no-meta)

`AUDIT-LEDGER.md:21` marks corpus item #2 (constellation click-WARP-to-nearest-cursor +
easter eggs) **UNADDRESSED** — "neither copy warps; slides copy only ripples." This is FALSE
for glass-ui. AX.W17 shipped `warpOnClick` as a first-class engine concept:
- `src/components/custom/constellation/Constellation.vue:52` — `warpOnClick = false` prop;
  `:40-44` + `:70-75` document "a click warps the focal node to the nearest drifting node."
- `package.json` proof gate `proof:constellation-warp-live` (a fail-closed π render gate that
  reads back the engine-owned `field.warp.{x,y}` per frame) is wired and GREEN.
- `docs/tranches/AX/PROGRESS.md` — `W17 | constellation tokens + warp + slides adopt | complete`.

AY.W-CON2's hard gate ("click warps to nearest node (captured); easter eggs fire") is therefore
HALF-shipped: the warp exists and is gated; only the easter eggs are net-new. The wave as
written re-builds warp from zero. **The drift:** the plan reads as if AX never happened
(greenfield-no-meta inversion — it strips the real history instead of building on it).

### F2 — STALE-BASE DRIFT: the touch-target/type-scale SYSTEM is shipped, not "DEFERRED"

`AUDIT-LEDGER.md:23` marks #4 (library-wide touch-target + type-scale) **DEFERRED** — "only dock
coarse-pointer floor (`--dock-scale`); no library-wide touch/type-scale system." This is FALSE.
AX.W51 (D18) shipped exactly that system:
- `src/styles/tokens.css:1139-1188` — `--ui-scale` is the MASTER unitless comfort scalar (typed
  `@property <number>`, inherits:true); the `--control-h-{xs,sm,md,lg}` cohort derives through it
  as `max(calc(N * var(--ui-scale)), var(--control-floor))`, with `--control-floor`/`--touch-target`
  the WCAG-44px clamp; `--dock-scale` was RECONCILED onto the master (not a parallel 1.5×).
- `src/styles/glass.css:566-653` — `.btn-pill`/`.input-pill` geometry rides `--ui-scale`.
- `package.json` `proof:ui-scale` GREEN; `docs/tranches/AX/PROGRESS.md` —
  `W51 | comfortable library-wide --ui-scale | live-verified … DELTA audit/visual/W51-DELTA.md`.

AY.W-SCALE1 says "A library-wide --touch-target floor + a responsive type scale … (not just the
dock)" and proposes a NET-NEW `proof:touch-target` gate. The system + clamp already exist on
`--ui-scale`/`--control-floor`. **The drift:** re-minting a parallel `--touch-target` axis
violates the user's own AX.W51 reconcile intent ("the retro-reconcile, NOT a parallel 1.5×")
and the DRY/no-parallel-recipe precept. The remaining live work (audit the cohort APPLIES across
EVERY interactive atom, the responsive type ladder on the φ-scale) must EXTEND `--ui-scale`, not
fork it. AY.W-SCALE2's "axe target-size pass" is the genuinely-open piece.

### F3 — STALE-BASE DRIFT: the slider zoo is already TWO; W-SLD1 is a cosmetic rename, under-specced as a clean break

`AUDIT-LEDGER.md:28` marks #9 (slider zoo → glass-scrubber + spectrum) **DEFERRED** — "multiple
slider variants; no consolidation." FALSE. AV.W11 / AX.W59 already collapsed the zoo to EXACTLY
two recipes:
- `src/components/ui/slider/index.ts:42-45` — `variant: { standard: '', spectrum: '' }`; `:53`
  `variant: 'standard'` default. `:14-30` documents the two AX.W59 recipes.
- `proof:slider-two-only` (`scripts/proof-slider-two-only.mjs:40`) — `EXPECTED_KEYS =
  ["standard", "spectrum"]`, already gating the cardinality + the squircle-thumb policy.
- `docs/tranches/AX/PROGRESS.md` — `W59 … STANDARD = continuous integrated cylinder (thumb=fill
  cap, no demarcation) … proof:slider-two-only green; DELTA … W59-DELTA.md`.

The user's actual ask ("a FULLY ROUNDED iOS knob continuous with the track, not pill/offset")
is **already satisfied** by `standard` — `index.ts:15-23` calls it "the INTEGRATED-CYLINDER glass
slider … its rounded LEADING edge IS the grab. There is NO visible demarcation between thumb and
fill … This is the general-purpose **glass scrubber** and the default." The doc even uses the
exact phrase "glass scrubber."

So AY.W-SLD1's only live content is the RENAME `standard` → `glass-scrubber` (zero behavior
delta). If kept, that rename is a clean break (correct per no-backwards-compat) but is
UNDER-SPECCED — the wave names only "two slider exports; proof:slider-two-only extended" and does
NOT enumerate the rename blast radius. A clean break must sweep ALL consumers incl. tests:
- `src/components/ui/slider/index.ts` (CVA key + `defaultVariants.variant`),
- `src/components/ui/slider/Slider.vue:34` (`props.variant ?? 'standard'`) + every
  `[data-variant="standard"]` scoped-CSS selector (`Slider.vue:183`+),
- `scripts/proof-slider-two-only.mjs:40` `EXPECTED_KEYS` + the `data-variant="standard"` regex,
- `demo/stories/forms/slider.vue`,
- `tests/` mirror specs that key on the variant,
- `CLAUDE.md` Slider section.

**Open question the wave must DECIDE, not assume:** is the rename worth a zero-delta clean break
at all, given `standard` already documents itself as "the general-purpose glass scrubber"? The
wave spec must state the rationale (semantic clarity for consumers) or RETIRE the rename.

### F4 — STALE-BASE DRIFT: all four component READMEs already exist; W-AUR1/W-BLOB1 gates are under-specced (unbound N)

`AUDIT-LEDGER.md:33` marks #14 **DEFERRED** — "constellation has a README; aurora/blob/dock
READMEs not research-backed." FALSE on existence: all four ship —
`src/components/custom/aurora/README.md` (702 lines), `goo-blob/README.md` (422),
`dock/README.md` (299), `constellation/README.md` (381). AX also already wrote the research
corpora: `docs/tranches/AX/research/{aurora,blob}-research-corpus.json`.

The genuinely-open piece is whether the existing READMEs are RESEARCH-BACKED to the AY bar; that
is a content-quality delta, not a from-zero write. **Compounding precept violation:** the
W-AUR1/W-BLOB1 hard gates read "research doc with **≥N** cited techniques + a ranked
path-forward" (`AY.md:55,59`). `≥N` is a literal placeholder — an UNBOUND threshold is not an
evidence-backed hard gate (TRANCHE-AND-WAVE-SPEC.md §"Hard gate": "valid only when it can be
verified by an artefact"; a placeholder N can never fail). Bind N to a number, or make the gate
"the ranked path-forward names ≥K techniques each with a citation + a feasibility verdict."

### F5 — L.W-ADOPT: the convergence HEADLINE wave has no spec + a stale resolution-gate premise

L.W-ADOPT (delete bespoke `src/decks/til-briefing/constellation.ts`, consume
`@mkbabb/glass-ui/constellation`) is THE convergence exemplar — the user's named root-cause fix,
the "constellation.ts is the exemplar to KILL." Yet:
- It has **no wave spec file** — `docs/tranches/L/waves/` carries L.W1–W7 only; W-ADOPT, W-MOB,
  W-CHR are inline rows in `L.md` with no file:line edit-sites and no evidence-backed hard gate.
  This violates WAVE_SPEC discipline for a wave of this weight (the headline convergence ask).
- Its gating premise is STALE on TWO counts:
  1. `@mkbabb/glass-ui/constellation` is **already exported** in 3.9.0 (`package.json` ships the
     `./constellation` subpath: `types: ./dist/constellation.d.ts, import: ./dist/constellation.js`).
     So "gated on AY's component exports (AY.W-CON3)" is wrong — the export already exists; the
     real gate is the PERFECTED version + warp/easter-eggs landing, which means AY.W-CON2 +
     **AY.W-PUB1** (publish), not W-CON3.
  2. slides resolves glass-ui through the **registry at `^3.9.0`** (`slides/package.json`), NOT a
     `file:` link. Per the cross-repo-dev-resolution contract-v2 **G.W5 amendment** (inv 53,
     `docs/precepts/cross-repo-dev-resolution.md:324-348`): "the published `latest` tag is the
     consumer-default; consumers declare `^X.Y.Z` semver and resolve through the registry."
     Therefore L.W-ADOPT cannot consume the perfected constellation until AY **publishes** a new
     version AND slides **bumps** `^3.9.0 → ^<new>`. The L plan's §3 "gated on AY's component
     exports (AY.W-CON3)" omits both the publish dependency and the semver bump — it states the
     wrong upstream gate.

`AUDIT-LEDGER.md:20` is correct that slides is "NOT consuming" the lib constellation (the bespoke
`constellation.ts` is 23903 bytes at HEAD, verified present), so the WORK is real — but the wave
that does it is unspec'd and points at the wrong upstream gate.

### F6 — Squircle-policy internal inconsistency AY inherits via the AX close (Band E folds W56)

The AX.W56 squircle policy carries an unresolved internal contradiction that AY absorbs when it
"finishes the AX close":
- The W56b amendment (`AX.W56-squircle-design-language.md:13-20`, dated **2026-06-09** — today)
  RATIFIES extending the superellipse to "dialogs + sheets + **panels** + glass hero cards."
- But `scripts/proof-squircle-language.mjs:178-180` still asserts POLICY-CARD-ROUND:
  "`--corner-shape-panel` must be `round` (panels stay round)", and the W56 spec body
  `:80-82` says "cards, pills/buttons, small docks, and **panels** stay ROUND."

Panels are simultaneously "round" (gate + body) and "squircle" (W56b amendment). This is not in
my lane's center (it's a squircle-correctness defect, lane-adjacent), but it IS a precept-drift
seed: AY's Band-E "finish the AX close" cannot close cleanly while the W56 gate and its own
amendment disagree. Fold into the W56-reconcile or the AY close-gate sweep, and DECIDE
panel-membership once.

### F7 — `--corner-shape-dialog`/`-sheet`/`-hero` minting must clean-break, not alias

The W56b amendment introduces `--corner-shape-{dialog,sheet,panel,hero}` aliases (per
`proof-squircle-language.mjs:247-277` the gate already expects the dialog/sheet glass surfaces
to read `var(--corner-shape-{dialog,sheet})` inside `@supports`). When AY lands this through the
close, the no-backwards-compat keep binds: NO alias to a retired keyword, NO dual round+squircle
declaration. The gate at `:275` already forbids `.glass-card/.glass-btn/.btn-pill` carrying a
`corner-shape` — keep that fail-closed and ensure the new aliases REPLACE, not shadow, the
shipped keyword. (Flagging so the close-wave does not "add" the dialog/sheet shape as a parallel
block.)

---

## House keeps that are CORRECTLY UNDISTURBED (no drift — recorded so a later pass does not "fix" them)

- **in-srgb surface-tint** (CLAUDE.md): neither plan touches the `--surface-tint-*` family.
  AX.W55 adaptive-glass explicitly edits ONLY the `in oklab` glass-tint axis and "NEVER touches"
  the in-srgb family — AY inherits that discipline. CORRECT.
- **`cn()` hand-rolled deduplicator**: no plan proposes a `tailwind-merge` re-upgrade. CORRECT.
- **`.focus-ring` utility over inline ring chain**: untouched. CORRECT.
- **cartoon-shadow `:root`-token override contract**: untouched; no dead-local re-declaration
  proposed. CORRECT.
- **easing doctrine (§6)**: AY.W-DOCK2 ("ios-springy LOCKSTEP") + W-CON2 (eased warp) must ride
  the existing `--spring-snappy`/`--spring-smooth` registers per the §6 table — neither plan
  proposes a new easing token. CORRECT (verify at impl that no bespoke spring is minted).
- **cross-repo-dev-resolution v2**: slides correctly consumes via registry semver `^3.9.0` (the
  G.W5 amendment's consumer-default), NOT a `file:` link or `dist/` alias. CORRECT — the only
  drift is L.W-ADOPT naming the wrong upstream GATE (F5), not the resolution mechanism.

---

## CHRONIC MISSES (deferred/mis-stated across ≥2 passes)

- **Greenfield-no-meta / accurate-status as a CLASS** — the AUDIT-LEDGER mis-states ≥4 items
  (#2 warp, #4 ui-scale, #9 slider, #14 READMEs) as undone when AX shipped them live-verified.
  This is the same stale-base trap the user's MEMORY records ("Workflow stale-worktree trap:
  worktree lanes can seed at a stale base; mandate a step-0 reset to real HEAD + verify before
  harvesting"). The ledger was authored without a step-0 reconcile against AX/PROGRESS.md.
- **Squircle panel-membership** — round (W56 body+gate) vs squircle (W56b amendment) unresolved
  across the W56 spec's own two halves; AY inherits it.

## FOLD-INTO routing

- F1 → AY.W-CON2 (re-scope: warp is SHIPPED+gated; the wave is easter-eggs + a ledger
  status-correction, NOT a from-zero warp build).
- F2 → AY.W-SCALE1/W-SCALE2 (re-scope: EXTEND `--ui-scale`/`--control-floor`, do NOT fork a
  parallel `--touch-target` axis; the live work is the per-atom application audit + the φ type
  ladder + the axe target-size π capture).
- F3 → AY.W-SLD1 (add the rename blast-radius enumeration as the hard gate's edit-site list, OR
  retire the rename with rationale; correct the ledger #9 to DONE-rename-pending).
- F4 → AY.W-AUR1/W-BLOB1 (bind the `≥N` placeholder to a number; re-scope W-DOC1 as a README
  quality-uplift over the existing 4 READMEs, not a from-zero write).
- F5 → L.W-ADOPT (author the wave spec file; re-point the upstream gate to AY.W-PUB1 + a slides
  semver bump per the v2/G.W5 contract).
- F6 → AY.W-CLOSE1 / a W56-reconcile fold (decide panel-membership once; reconcile gate ↔ amendment).
- F7 → AY.W-CLOSE1 (clean-break the new corner-shape aliases; no shadow keyword).
- The greenfield/stale-base CHRONIC → a mandated **AY step-0 reconcile**: re-derive the
  AUDIT-LEDGER status column against `docs/tranches/AX/PROGRESS.md` + the live `package.json`
  gates + the live source BEFORE any AY wave dispatches.

## CONVERGENCE CRITERIA (the acceptance bar for this lane)

The AY/L plans are "precept-clean" when: (1) the AUDIT-LEDGER status column is reconciled against
AX-shipped reality (no item marked undone that ships live-verified — verifiable by cross-walking
each row to AX/PROGRESS.md + the named proof gate); (2) every clean-break rename in AY enumerates
its full consumer+test+gate+doc blast radius in the wave's edit-site list; (3) no AY wave mints a
parallel token axis where an existing one (`--ui-scale`, the two slider keys, the four READMEs)
already covers it; (4) every research-wave hard gate carries a NUMERIC, falsifiable threshold (no
`≥N` placeholder); (5) L.W-ADOPT has a wave spec naming the bespoke `constellation.ts` file:line,
the lib subpath it adopts, the AY.W-PUB1 publish + slides-semver-bump upstream gate, and the
no-behavior-delta capture; (6) the squircle panel-membership is decided once (gate ↔ amendment
reconciled); (7) the in-srgb / cn() / focus-ring / cartoon-shadow / easing keeps remain
UNDISTURBED (verifiable by grep-absence in the final plans + impl diffs).
