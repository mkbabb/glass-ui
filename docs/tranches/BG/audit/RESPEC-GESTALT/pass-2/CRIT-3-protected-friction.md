# CRIT-3 — Protected-set + friction-history adversarial critique (RESPEC-GESTALT pass 2)

**Date:** 2026-07-01 · branch `tranche/BG` @ `306c3059` (tree clean). **Lane:** Critic 3 — read all four
pass-2 develop outputs (DEV-A1, DEV-A2, DEV-B, DEV-C) against `SYNTHESIS-PASS1 §4` (protected set) + the
friction taxonomy (SEED-CONTEXT + `RESPEC-COHERENCE/COHERENCE.md`). Every finding disk-verified 2026-07-01.

**Convergence (this lane): 88%.** The plan honors the protected set carefully, preserves every discipline
that caught real bugs, kills the sibling-probe gate, abolishes W-REFLECT3, and honestly re-verifies
landed-vs-pending (correcting both prior audits' single violations). Three real defects gate it below the
bar-clearing line; all are bounded and named-fixable without re-developing the shape.

---

## 1. What the plan gets RIGHT (protected-set + discipline preservation — verified)

- **Protected identity untouched where it must be.** F2.2 (`W-GLASS-BASIS-CONSOLIDATE`) explicitly fences
  `--glass-level`/`--glass-depth` composition, six-layer composite, warm-HSL values, alpha ladder, `in srgb`
  surface-tint, φ constants as BYTE-IDENTICAL, with a byte-identical π ground ("any pixel drift is a
  finding"). This is the highest-risk wave and it is the most carefully fenced. ✓
- **The sibling-probe friction class is caught and KILLED.** `proof:retired-token-consumers` is ABSENT on
  disk (verified); DEV-A1 0.7 + DEV-B §2.5 both KILL it (never mint) and re-base the bbnf ask on its
  MIGRATION row + `proof:crossrepo-asks:bh >=4` — the foreign-tree fence (inv-26) run-backwards is closed. ✓
- **W-REFLECT3 phantom abolished completely.** DEV-B §3.3 + DEV-A2 §5 scrub all cursor rows + 6 build-map
  tails + the FINAL.md:344-347 re-legitimization under ONE rule; every live-π closes at its owning wave. The
  DONE-inflation vector dies. ✓
- **Landed-narrated-as-pending caught BOTH ways.** DEV-B §1.0 re-verifies B1 3/3 + B2.4a LANDED; DEV-A2 §7
  corrects the false "ratchet drained to ∅" (16 live baselines) AND the false "useCelebrationBurst 2
  consumers" (0 on disk, verified). The GC-FC10 per-band disk re-verify is preserved. ✓
- **Disciplines intact:** paint-decoupled dual-engine per-wave (DEV-B §3 restores it in engine CODE, not
  prose), null-guards (`.catch(() => null)` in the engine patch), literal PASS (`bg-paint.wf.js` unchanged),
  `--run full` union at cut (DEV-B §2.6 explicitly protects; over-contrivance culled UPSTREAM not at the
  cut), disposition/fold ledger (F8.7 RETIRE-in-place, NDA no-delete fence), foreign-tree fence (DEV-B §3.4
  worktree-GC scoped ABSOLUTELY to `.claude/worktrees/`, runs `verify-siblings-intact` first). ✓
- **Derive-not-hand-author extended:** `structure.md`/`dependencies.md` generated-from-disk (DEV-B §1.7),
  token manifest generated (F8.5), exports regenerated — the hand-authored-map friction class is reduced,
  not grown. `uDispersion`→`uChromatic` stale-uniform stamped SUPERSEDED (DEV-A2 §7 F-A2-3). ✓
- **≥2-consumer bar honestly applied to Siri.** DEV-A1 8.3 ships `SiriWaveform` demo-private (bar
  un-evidenced) on the `useGlassBackdropLuminance` precedent; the island is a DOCK CAPABILITY through the
  existing `.glass-dock-frame`/`#rail` escape — no new subpath, no `api/` entry. This is the honest
  application the mandate asks for. ✓

---

## 2. MUST-FIX (protected-set / friction defects)

### MF-1 [MAJOR] — DOCK_SPRING "retune" contradicts its own byte-frozen fence + §4 protected per-spring clock
DEV-A1 4.1's gate disposition PRESERVES `proof:dock-engine` E4, which on disk asserts *"morph mechanism +
DOCK_SPRING **byte-frozen**"* (`proof-dock-engine.mjs:629`, reds-on-revert). Yet DEV-A1 5.2 states *"WS2 4.1
**retunes DOCK_SPRING**"* and makes "carry the retune into `motion-canon.md:195` + `tunable-anim.md:63`" a
deliverable (citing values `0.68/0.64` that do not match the fenced `DOCK_SPRING = {response:0.32,
ζ:0.7}`, `constants.ts:85`). DOCK_SPRING is byte-fenced across the whole dock band (`README.md:324`
"box-inviolate", morph-showcase, morph-insitu) and `SYNTHESIS §4` protects "per-spring clocks."
**Disambiguate before build:** if 4.1 is a pure INSTANCE consolidation (5 `SpringProgress`→1 `useDockSpring`
driver reading the frozen constant — which the E4-preserve implies), DELETE 5.2's "retune" language + its
precept re-sync deliverable (it is spurious). If a genuine value change is intended, it RE-PLUMBS a fenced
identity and is FORBIDDEN. As written the two rows contradict, and the "retune" reading is a §4 violation.

### MF-2 [MAJOR] — Chart ADD ≥2-consumer bar unevidenced; DEV-A2 and DEV-C contradict
Disk: no `src/components/custom/chart/` dir, 0 `GlassChart` references. DEV-A2 §3(a) correctly demands the
`≥2-consumer bar proven BEFORE build` ("born only when ≥2 real consumers exist"), but names ZERO consumers.
DEV-C F6.4's gate clause is WEAKER and conflated: it asserts only that "the `--chart-*` tokens resolve a
live consumer (born-RED = 0 chart consumers)" — but the phase-bus already reads `--chart-*` tokens, so that
is a TOKEN consumer, not a `<GlassChart>` COMPONENT consumer, and it checks ONE, not two. A demo exerciser
is not a binary consumer (J-inv-10). This is the exact single-consumer/over-contrivance friction the audit
exists to cure, smuggled in as an endorsed ADD. **Fix:** name TWO real binary `<GlassChart>` consumers, or
demote to KEEP-BOOKED-honest (the Date-Calendar / DS-Complete disposition), and reconcile DEV-C F6.4's gate
to the ≥2-component-consumer bar DEV-A2 states.

### MF-3 [MAJOR] — the substitution/dead-knob witness class is not protected through the 360→~250 consolidation
No `proof:dead-knob` gate exists; the documented "3rd-recurrence AX.W55 substitution class" is caught only
by SCATTERED witnesses — `proof:ui-scale` (`dock-coarse-redeclares-scale`, `dock-coarse-scale-minted`),
`proof:dock-plate-clearance` (the `0px` dead-knob-evasion assert, `:180`), `proof:adaptive-reconcile`. The
gate-family fold (F8.1 / 12.3 / B5e) collapses 360→~250 on a "ZERO behavioral assertion lost" census, but
NOWHERE names the dead-knob/substitution class as must-preserve. F2.2 cures ONLY the glass-tint axis
structurally; every other token axis still relies on its witness. **Fix:** enroll these named dead-knob
witnesses in the F8.1 PROTECT true-positive set (beside `live-verified-ledger`/`profile:budget`) OR require
the subsumption census to enumerate each dead-knob bite → its surviving family-gate clause. The class that
recurs 3× must not silently drop in a consolidation whose whole risk is dropped assertions.

---

## 3. MINOR / WATCH

- **MN-1 [MINOR] — F2.2 reverses the deliberate "plain per-mode pair idiom" for dark COLOR tokens.**
  Deleting the ~60 dark-arm color duplicates → `light-dark()`-only reverses a CLAUDE.md-DELIBERATE house
  pattern ("the plain per-mode pair idiom, the house pattern for explicit-color tokens"). The DEV output
  correctly keeps the inset-shadow-trap exception (MEMORY-documented) in `.dark {}` and gate-asserts
  disjointness — but the wave must (a) record the idiom reversal as INTENTIONAL (not silent drift), and (b)
  gate that no migrated "color" token feeds an inset-shadow fragment (the light-dark() trap fires on
  fragments, not whole colors). Well-guarded; flag so it is not a silent identity-idiom flip.
- **WATCH-1 — the glass family gains THREE new axes (F2.1 `--glass-definition`, F2.2 `.glass-surface`
  basis, F2.3 deep-decide) while the mandate verb is COLLAPSE.** F2.1 is the user's #1 fix (near-gray
  control) and F2.2 nets strongly negative, so the family should end simpler — but confirm F2.1's
  `--glass-floor-fill` composes UNDER the transmissive fill via the F2.2-factored recipe (sequencing note
  already inverts F2.2→F2.1) so it does not re-create the very substitution second-layer F2.2 kills.
- **WATCH-2 — DEV-A2 §6 mints a NEW ratchet exemption class (`css-registration-manifest`, property-regs.css).**
  Legitimate (a flat `@property` list is not a logic god-module) and gate-asserted by shape, but it is a new
  loophole surface; keep the shape-check strict so a logic file cannot smuggle in as a "manifest."
- **WATCH-3 — F5.1 folds `useSpringPress` INTO `useLiquidPress` and re-points `proof:button-glass` B2.**
  Not a §4-protected symbol, but the press-tower collapse must preserve the interruptible velocity-continuous
  re-seat (the iOS W-PRESS-UNIFY contract) and Button's byte-identical `--glass-btn-press-t` drive; DEV-C's
  element-morph press arm covers it — verify at build, not assume.

---

## 4. Scoring

Protected set: respected (one MAJOR contradiction to disambiguate, MF-1). Disciplines: fully preserved.
Friction classes: sibling-probe KILLED, landed-vs-pending re-verified, W-REFLECT3 abolished, gate-vacuity
fixed, derive-not-hand-author extended, hand-map reduced — the recurring classes are addressed EXCEPT the
dead-knob witness (MF-3). ≥2-consumer law: honest for Siri, DISHONEST/unevidenced for Chart (MF-2).

**Convergence: 88%** — above the 85% develop-ready bar. MF-1 (protected fence contradiction) and MF-2 (≥2
Chart) are the two that must close before the fold; MF-3 is a bounded census amendment. No finding requires
re-shaping a family — all three are text/gate/consumer-evidence fixes on already-correct wave shapes.
