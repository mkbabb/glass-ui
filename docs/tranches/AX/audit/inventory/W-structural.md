# AX Inventory — W-structural lane (J · ENCAPSULATION: W25a/b, W26, W27a/b)

HEAD at audit: `88a2ec5` (tree advanced past the prompt's stated `c72d2ac`; 3.8.0 +
convergence-1 W44-W52 + convergence-2 W53-W59). Read-only inventory; no edits.

## Verdict in one line

The ENTIRE J-band (W25a, W25b, W26, W27a, W27b) is **NOT-STARTED** — all five rows are
`planned` in PROGRESS.md, every named gate/target is at its AV-era pre-state, and the
born-RED gates fire RED at HEAD exactly as the charter predicted. The waves remain
**VALID + born-RED** (convergence-1 + convergence-2 both re-ratified them), and the targets
have **grown ~30%+** since the charter was authored — including two NEW carry-forwards the
tranche minted *after* the J-band specs were written (SegmentedTabs.vue from W53; the W58
story-language sweep is a sibling, not absorbed). This is a clean, well-specified, fully
unstarted band.

---

## Per-wave status

### W25a — CSS god-module gate-extension (born-RED, .css-aware, ci-tagged) — NOT-STARTED

The gate `scripts/proof-no-god-module.mjs` is STILL `.ts`/`.vue`-only (line 47:
`endsWith(".ts") || endsWith(".vue")` — CSS structurally invisible) and STILL
`tags: ["local"]` in `gates.mjs:344` (the `['local','ci']` re-tag NOT done). The dist
`@source "../components"` content-scan deadlink is STILL present in BOTH
`src/styles/index.css:133` AND the built `dist/styles/index.css:141` — resolves to a
`dist/components/` dir that does not exist (dist is a flat `dist/*.js` chunk set), so the
library's own component-template content-scan scans nothing in a consumer prod build. None
of the three W25a deliverables (collector `.css`-awareness · ci re-tag · dist `@source`
re-point) is done.

The instant the collector accepts `.css`, it will report the four expected born-RED
violations — current line counts (grown from the charter's 1728/1227/1119/691):
- `tokens.css` **1983** (charter 1728, +15%)
- `dock.css` **1639** (charter 1227, +34% — cleared by W06, not W25b)
- `utilities.css` **1154** (charter 1119)
- `glass.css` **795** (charter 691 — NOT carved for length per the harden note; single
  cohesion axis)

Plus two CSS files that crossed 500 since the charter and would ALSO flag under a naive
`.css` extension: `dock-controls.css` **531** and `theme.css` **514**. The W25a spec must
account for these (theme.css/dock-controls.css were not in the original 4-violator list).

**dependsOn** W27a (gate-tag MODEL precedes) — W27a also NOT-STARTED, so the ordering
constraint is intact but unsatisfied.

### W25b — CSS monolith carves — NOT-STARTED

No `src/styles/tokens/` partials dir exists. `glass-specular-track.css` is NOT renamed to
`glass-material.css` (the file is still `src/styles/glass-specular-track.css`).
`floating-panel.css` dead chain is still present (`src/styles/floating-panel.css`). Zero
carve work done.

**Sequencing risk (REAL):** W25b's utilities-carve portion `dependsOn` W06 (dock css split),
W09 (specular — `live-pending`), W22 (font — `complete`), W29 (metric-ownership decision —
`planned`). The TOKENS-carve portion is unblocked (independent §-seam partials); the
UTILITIES-carve portion is GATED behind W29 (the ~190-line metric-badge block must relocate
to the RIGHT repo after the §7/§8 metric-ownership decision). The A-1 `.instrument-rail`
twin-line groove capture (W21) must sequence BEFORE W29 prunes the twin-line @utility — a
cross-wave ordering the W25b spec already records but that is unstarted.

### W26 — TS god-module + state encapsulation — NOT-STARTED

`proof:no-god-module` fires RED at HEAD (exit 1) on **FOUR** violators (charter named three):
- `useMetaballRenderer.ts` **690** (charter 569→690, +21% — the named split target)
- `SegmentedTabs.vue` **683** — **NEW carry-forward from W53 (convergence-2)**, NOT in the
  original W26 target set. W53 unified BouncyToggle/BouncyTabs/UnderlineTabs/ResponsiveTabs
  into one 683-line SFC. This MUST FOLD INTO W26 (or W26's scope must explicitly own it).
- `GlassDock.vue` **534** (charter 505→534 — owed to the dock band / W45, NOT W26 per the
  carry-forward note; confirm ownership)
- `constellationField.ts` **510** (charter 510 — owed to W17/dock per the W12 carry note)

Every named W26 source-encapsulation target is UNADDRESSED:
- dock `syncDerived()` still present (`useDockState.ts:99` + 9 call sites) — `expanded`/
  `isPinned` are still imperatively-mirrored writable refs, NOT `computed()` derivations.
- keyboard registry still `new Set<RegisteredShortcut>()` + a manual `version = ref(0)`
  counter (`useKeyboardShortcuts.ts:215-216`), NOT a tracked reactive collection.
- `useSidebarFollow.ts` + `useScrollTracker.ts` still hand-roll `requestAnimationFrame`
  (NOT re-based onto the library `useSpring`/motion primitive).
- `useGlassRenderer.ts` (257 lines) detector/filter split UNDONE — and this split is
  **coupled to W20** (GlassPanel retire kills the imperative filter), which is `planned`.

**dependsOn** W08 (`complete`), W16 (`complete`), W20 (`planned`). The GlassRenderer split
leg is blocked on W20; the metaball + dock-state + keyboard + sidebar legs are unblocked.

### W27a — Legacy gate-hardening (barrel scrub + tag-parity + var-in-arbitrary) — NOT-STARTED

`proof:tag-parity` and `proof:no-dead-arbitrary` are **NOT REGISTERED** (no package.json
script, no `scripts/` file). The three structural string-gates are all STILL `tags:
["local"]` — `proof:fail-explicit` (`gates.mjs:338`), `proof:no-god-module` (`:344`),
`proof:no-legacy-commentary` (`:350`) — the `['local','ci','release']` re-tag for the 2
named legacy gates (fail-explicit + no-legacy-commentary) is NOT done.

The "3 barrel refs" carry-forward has GROWN: tranche-letter refs now appear across MANY
`src/components/ui/*/index.ts` barrels (drawer, tooltip, alert, slider, toggle, dialog,
popover, button, _shared, sheet, … — well past 3; convergence-1 noted "3→6 from the W37
re-home", and it is larger still at HEAD). The var-in-arbitrary dead-class class is live and
visible — `CarouselDots.vue:73` documents the dead `scale-[var(--scale-hover)]` (the W23
symptom), and active arbitrary classes (`button/index.ts`, `ConfiguratorRow.vue:91`
`scale-[var(--scale-press,0.97)]`) need the non-emit guard gate to distinguish live-from-dead.

**dependsOn** W00 (`complete` — the gate-tag MODEL decision, shared with W25a). The W27a
tag-model decision is the FIRST act and the precedence anchor for W25a — both unstarted.

### W27b — Legacy commentary full-tree sweep — NOT-STARTED

`proof:no-legacy-commentary` is STILL the 2-barrel allowlist (`TARGETS = ["src/api/index.ts",
"src/index.ts"]` at line 31) — NOT generalized to a full `src/ + scripts/` walk. It fires
RED at HEAD (exit 1) on **7 hits in the 2 barrels** (api/index.ts ×5: AW.W16/AW.W17/AX.W17/
AX.W37×2; index.ts ×2: AW.W16/AX.W37) — the W24 carry-forward, intact.

The one-time scrub has GROWN: the charter measured 516/181 files → "tree grew to 878" →
**now 1017 tranche-letter refs across 211 src/ files** (a further +16% over the charter's
878), PLUS **599 refs in scripts/** (the W27b scripts/ test-boundary + scrub extension).
The Card stale-prop shim is still present (`Card.vue:110` dev-WARN on stale `variant`/`flush`
prop names — the W6 typed-reject endgame unfinished). The scripts/ test-boundary is still
asymmetric (gate self-tests live inline in `scripts/*.mjs`, not relocated to `tests/scripts/`).

**dependsOn** W27a — unstarted, ordering intact.

---

## DEFERRED items that MUST FOLD INTO this lane

1. **SegmentedTabs.vue (683 lines) → W26.** W53 (convergence-2) created a NEW god-module
   violator after the W26 spec was authored. W26 either absorbs the SegmentedTabs split or
   the spec is explicitly amended to route it. Currently homeless.
2. **The W12-band carry-forwards (PROGRESS.md lines 126-132).** W12 explicitly handed
   `proof:no-god-module` 3-file FAIL → W26/dock/W17; W23 `proof:design-idiom-localization`
   RED → W27a; W24 `proof:no-legacy-commentary` RED → W27b. All three carries are LIVE and
   land squarely in this lane. The design-idiom-localization gate IS registered and is a
   W27a/W23 concern.
3. **theme.css (514) + dock-controls.css (531) crossing the CSS bound.** The W25a `.css`
   extension will flag SIX files, not the charter's four. The spec's "4 expected born-RED"
   count must be updated to reflect HEAD, and dock-controls.css/theme.css need a carve or
   cohesion-exemption ruling (dock-controls.css is itself an AU.W8b.3 carve — likely
   cohesion-exempt; theme.css is the @theme bridge — likely cohesion-exempt).
4. **W25b utilities-carve gated on W29 (metric-ownership) + W06 (dock split) + W09.** The
   tokens-carve sub-portion is independently shippable; the utilities-carve must wait. Plan
   the W25b SUB-WAVE split (tokens-now vs utilities-after-W29) explicitly.
5. **W26 GlassRenderer split gated on W20 (GlassPanel retire, `planned`).** Sequence the
   metaball/dock-state/keyboard/sidebar legs (unblocked) ahead of the GlassRenderer leg.

## GAPS / divergences

- **The gate-tag MODEL decision (the W27a + W25a shared first act) is unmade.** Both waves
  pivot on it (`['local','ci','release']` at-LEAST-ci form, 2 legacy gates as the named
  exception). Until it is decided, neither W25a nor W27a can land cleanly — this is the
  band's true critical-path head, and it depends only on W00 (`complete`). Nothing blocks
  starting it.
- **ci.yml drift (band-close / W33).** Convergence-1 records 14 ci-tagged gates absent from
  `.github/workflows/ci.yml` (mostly π-lane). The W25a/W27a ci re-tag ADDS to the ci.yml
  surface — coordinate the re-tag with the W33 π-gate-in-CI infra decision so the new
  ci-tagged structural gates actually run in CI and don't become fresh drift.
- **The `proof:no-god-module` artefact still names "AV-no-god-module" / "AV.W13".** Once
  W25a/W26 land, the gate header comments + artefact keys carry AV archaeology — itself a
  W27b legacy-commentary target (the gate scripts are in scripts/, the W27b extended scope).
  Self-referential: the legacy sweep must scrub its own gate scripts.

## Gestalt path forward (planning, not code)

1. **W27a FIRST (it is the band head + the tag-model anchor).** Make the gate-tag MODEL
   decision (at-LEAST-ci, 2 named legacy-gate exceptions), re-tag fail-explicit +
   no-legacy-commentary to `['local','ci','release']`, author `proof:tag-parity` (at-least-ci
   meta-assert) + `proof:no-dead-arbitrary` (the var-in-arbitrary non-emit guard — root-cause
   the CarouselDots/button/Configurator class), and scrub the (now >3) ui/ barrel refs. Small,
   mechanical, unblocks CI-RED. dependsOn only W00 (done).
2. **W25a NEXT (consumes the W27a tag-model).** Extend the collector to `.css` + ci-re-tag;
   re-point the dist `@source` deadlink to the real flat-chunk dist location; land BORN-RED
   on the (recount: 4-6) CSS violators. Rule on dock-controls.css/theme.css cohesion-exempt.
3. **W25b SPLIT into tokens-now + utilities-after.** Carve tokens.css §-seam partials
   (`src/styles/tokens/`) + rename glass-specular-track.css → glass-material.css + excise the
   floating-panel dead chain immediately (unblocked); SEQUENCE the utilities relocation after
   W29's metric-ownership decision + W06's dock.css split + the W21 A-1 twin-line capture.
   glass.css NOT carved for length (single cohesion axis — keep the harden ruling).
4. **W26 by leg.** Land the unblocked legs first — useMetaballRenderer split
   (metaball-program.ts + uploadMetaballUniforms.ts), the dock syncDerived→computed
   encapsulation, the keyboard reactive-collection, the sidebar useSpring re-base — then the
   GlassRenderer detector/filter split AFTER W20 retires GlassPanel. FOLD the SegmentedTabs
   (683) split into scope (cohesive sub-component extraction off the variant axis). GlassDock
   (534) + constellationField (510) ownership: confirm they ride the dock band / W17, not W26.
5. **W27b LAST (large mechanical sweep).** Generalize the gate to a full src/+scripts/ walk;
   one-time scrub the ~1017 src/ refs + ~599 scripts/ refs (DELETE landed-at-X notes; REWRITE
   design-WHY tranche-letter-free — the WHY survives, the letter dies; scrub the gate scripts'
   own AV.W13 archaeology); finalize the Card stale-prop shim (typed-reject endgame or excise);
   relocate scripts/ self-tests to tests/scripts/ or encode the exemption.

Every wave closes structural (no visual surface) EXCEPT the W25b carves, whose close
criterion is an isomorphic-cascade regression screenshot-diff (zero visual delta — same
@layer, same order). Validity: every wave is born-RED-correct at HEAD; the band is fully
unstarted, well-specified, and the targets are larger than the charter measured — confirm
the recounts into each per-wave spec before dispatch.
