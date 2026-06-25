# wave-spec-audit — WAVE-AMENDMENT (the concrete tranche amendment)

> The META-PASS deliverable is the **audit MECHANISM** (the consolidated machine-checkable ledger +
> the cross-cutting design-adherence consistency gate), not a per-component greenfield. So this
> amendment is about (a) HARDENING `golden/audit.mjs` + the GOLDEN §3/§4/§6 narrative against the
> three challenges, and (b) RECONCILING that mechanism against the EXTANT 116-wave set — AUGMENTing
> the waves that already own the same concerns (no duplicative fork), MATERIALIZING the absent
> canonical mints, and authoring the ONE genuinely-new fence. Reference implementation:
> `docs/tranches/BD/greenfield/wave-spec-audit/GOLDEN.md` (hardened by this assay). Verdict: **REFINE
> (~78%).** No re-architecture — additive linter passes, an `owed` table, a full-corpus scan, and a
> count fix. KISS, DRY, no legacy, no second linter, no parallel ledger.

---

## A. AUGMENT — `golden/audit.mjs` (the deliverable itself; the headline fix)

The mechanism is the artefact, so the primary amendment IS the linter. Eight changes, all additive or
count-corrections on the ONE script (no fork). Each is born-RED: it must turn a currently-passing
sham-gate into a real fail.

| # | change | audit.mjs locus | born-RED bite |
|---|---|---|---|
| **A1** | fold ALL gates into the exit code: `lintTotal += matrixRed + xengineFull + metaballRed + prmRed` | :179-181, :189, :224 | a row with `—` in an OWED axis must flip exit 0→1 (today it cannot) |
| **A2** | PASS-2 `owed[item][axis]` table from tier/role; `matrixRed = owed ∧ ¬satisfied`; GREEN = canonical-consumption (cite-of-mint + no competing local `@property`/`@utility`/recipe mint), not substring | :114-136 | a planted second-mint amendment scores RED; one real amendment REDs on a missing `DEPEND…FAILS-LOUD` fence |
| **A3** | PASS-2 NEGATIVE-precept band: `gray-glass` · `naive-ellipsoid` · `tight-springy` · `non-golden` (anti-keyword + structural) | new block after :136 | a planted `border-radius:50%` merge without `smin`/metaball trips `naive-ellipsoid` |
| **A4** | PASS-3 scan the FULL corpus `[...union, ...waves, ...amendments]`; add the `@supports`-guard recognizer for `backdrop-filter:url(#`; broaden box-shadow regex to `transition:[^;]*box-shadow` | :140-156 | the known-bad box-shadow snippet + an UNgated `url(#` in any union wave must trip |
| **A5** | NEW **PASS-4** metaball/cross-engine lint over every goo/morph/dock-morph wave: asserts waist-gate (`S.ratio` bound + `hasLocalMinimum`), sRGB `color-interpolation-filters`, Tier-S↔Tier-G parity bound, M6 Safari-capture-as-RED OR Tier-C teardrop fallback → RED into `lintTotal` | new pass | a goo wave missing the waist clause REDs |
| **A6** | NEW **PRM axis** in PASS-2 (real, exit-bearing): every motion/glass/goo OWES `--motion-weight→0` (or `--ease-standard`) + a `reduced-transparency`→opaque arm + must NOT zero `.cartoon-cast` ink | :116-136 | an amendment that PRM-zeroes the ink REDs |
| **A7** | count honesty: exclude straddle slugs from phantom (`if (onDisk.has(alt)) continue` before push) → phantom=**49**, straddle=16, lints=**76**; pad matrix cells to header width; relabel `green/total` "vocabulary coverage", drop from convergence | :89-94, :207-211 | report restates 92→76; §4 re-derived from `--json` |
| **A8** | foundation gate FLIPS to correctness at build: when the warm-floor decl lands, "0 hits = RED" → out-of-page `screenshot→getImageData` chroma read (≥0.02 both modes) | :158-176 | a gray floor shipped must RED (not pass on absence) |

Convergence = `0 phantom ∧ 0 dupMint ∧ 0 straddle ∧ 0 scopeBleed ∧ 0 xengineFull ∧ 0 matrixRed ∧
0 metaballRed ∧ 0 prmRed`, **2-consecutive-clean**, AFTER the materialize pass.

## B. AUGMENT — `GOLDEN.md` narrative (so the prose matches the hardened mechanism)

- **§4 + §5 (FLAG-2 area):** restate the TEAL/NAVY divergence as **9 cool heroes, not 5** (re-derived
  in code from `category-hero.ts {7,3,2,5,9,11,6,1,8,12,4}` × `color-radius.css` OKLCh angles vs the
  `H∈[25,95]` warm band: only amber 69.6° + tomato 30.4° in-band). Either RED-check all 9 angles
  (add violet 317.5 / purple 305.9 / periwinkle 291.9 / ruby 8.4 to teal 222.8 / indigo 265.5 / slate
  239.6 / ocean 208.0 / forest 171.1) OR explicitly carve the jewel-identity hues (violet/purple per
  `dark-arm.css §87`) with a one-line rationale and fence the remaining 7. **State which — no silent 5.**
- **§3:** mark the six canonical mints (`BD.W-PAGE-FIELD`, `BD.W-GLASS-FIELD`, `BD.W-MORPH-FIELD-WELD`,
  `BD.W-MORPH-PUNCH-TOKENS`, `BD.W-MOTION-WEIGHT`, `BD.W-CARTOON-PUNCH`) as **NEW/un-materialized**;
  state the "no 2nd mint" DRY guarantee becomes machine-checked only at materialization (the topo-sort
  throws on a dup token-mint), not today.
- **§6:** restate "92 structural lints" as **76** (49 phantom + 4 dup-mint + 16 straddle + 7
  scope-bleed); relabel `167/259 cells` as vocabulary-coverage, removed from the convergence proof.
- **§3/§4.1:** downgrade "glass warm-FLOOR = CODE not prose, painted-pixel gate" to "deferred to
  implementation (A8 flips the foundation gate when the decl lands)".

## C. AUGMENT extant waves — RECONCILE the mechanism against the 116-wave set (DRY, no fork)

The systemic wave-homes the GOLDEN §5 names already EXIST on disk as the right owners. AUGMENT them;
do NOT mint parallel waves.

- **`union/waves/BD.W-GATE-TRUTH-AUDIT.md`** — the systemic-home #2 target, and it is a PERFECT DRY
  match: it already mints `scripts/lib/shader-eval-harness.mjs`, the numeric net that "retires the
  string-presence theater" — the EXACT fraud my PASS-2/3 hardening attacks, one layer down (runtime
  shader-π vs spec-layer slug-graph). **AUGMENT:** add a clause declaring `audit.mjs` its
  **spec-layer structural twin** (the corpus-graph linter is to wave SPECS what the harness is to
  shader CODE), so the two share the binding π rule (out-of-page `screenshot→getImageData`, never
  in-page taint, never stop-strings) and the fake-gate fraud rule lives in ONE wave, not two.
- **`union/waves/BD.W-SAFARI-CAPTURE.md`** — already owns the lens-vs-goo WebKit fence matrix.
  **AUGMENT:** it is the PASS-4 (A5) wave-home — make it emit the committed metaball frame-series
  JSON (`S.ratio≤0.45 ∧ hasLocalMinimum ∧ |S−G|≤0.10`, the M6 Safari-26 capture-as-RED) that
  PASS-4 asserts on. No new SAFARI wave — this is its natural scope.

## D. NEW — the two genuinely-absent waves (no existing home; verified `grep -L`)

- **`BD.W-SECTION-HUE-WARM-FENCE`** (TIER-7, the GOLDEN §4 elevate; nothing cites it today —
  `BD.W-HUE-HISTOGRAM-HOIST` is a *backdrop-luminance* binning wave, a DIFFERENT concern). Re-indexes
  the cool hero slots to warm across the 3 CSS arms + the JS mirror + a structural `warmHeroHue()`
  clamp. **Born-RED `proof:section-hue-warm-fence`** that RED-checks **all 9** out-of-band angles
  (or the carved-7 per §B). Scope-widen to the hero ACCENTS, not only the field.
- **`BD.W-BUILD-TRAP-CANON`** (TIER-(-1), GOLDEN §5 systemic-home #1) — the 7 build-traps as a gated
  artefact (`@property inherits:false` on pseudo→initial; self-ref `--x:max(var(--x))` no-op; cel cast
  on inert child; `color-mix … transparent` WebKit black-premultiply; `scale()` shorthand clobbers
  centering; 2nd `animation:` clobbers; Vue `ref` on component→instance), not a buried callout. The
  linter's PASS-3/PASS-4 forbidden-literal set CONSUMES this canon.

## E. MATERIALIZE (the §7 user-gated hinge, unchanged) — resolves the DRY gates at build

Emit the ~30 NEW waves as real files under `union/waves/` with `tier:/depends:/disposition:`
frontmatter + a topo-sorted `BUILD-DAG.md`. This is what makes A2's "no 2nd mint" and the R-A4
"first mints aren't nodes yet" RESOLVE: a topo-sort with a dup token-mint or a dangling `BD.W-`
filename throws, and the hardened `audit.mjs` goes green. Includes the 6 PRUNE/SUPERSEDE/EXCISE
(GOLDEN §5, verified clean: `W-AURORA-METALLIC`→`BD.W-AUR-METAL-FINISH`; `W-BLURRED-IMAGE-BG`→
`BD.W-AUR-IMAGE-SOURCE`; goo carousel/morph/pager SUPERSEDE→`BD.W-GOO-BARBELL-NECK`; AUR-SATIN/PRISM
prune) + the FLAG-1 prefix-normalize (one convention, clean break, no alias). Separately USER-gated
(W-CUT, never auto).

## F. PRUNE / EXCISE — none in THIS amendment

The 6 PRUNE/SUPERSEDE are GOLDEN §5's and execute at MATERIALIZE (E). This meta-pass amendment prunes
no spec — it HARDENS the mechanism that will verify the prune lands clean.

---

### The reconciliation summary (cited by filename)

- **AUGMENT (deliverable):** `wave-spec-audit/golden/audit.mjs` (A1–A8) · `wave-spec-audit/GOLDEN.md` (B).
- **AUGMENT (extant union waves, DRY):** `union/waves/BD.W-GATE-TRUTH-AUDIT.md` (spec-layer twin of
  the shader-eval harness) · `union/waves/BD.W-SAFARI-CAPTURE.md` (PASS-4 metaball frame-series home).
- **NEW:** `BD.W-SECTION-HUE-WARM-FENCE` (TIER-7, 9-angle proof) · `BD.W-BUILD-TRAP-CANON` (TIER-(-1)).
- **MATERIALIZE (user-gated):** ~30 NEW waves + `BUILD-DAG.md` + 6 PRUNE/SUPERSEDE + FLAG-1 normalize.
- **No second linter, no parallel ledger, no legacy alias.** The mechanism unions with itself.
