# Round 1 — plan-vs-landed diff (?)

## Summary

The BI/Q roster overwhelmingly landed as specified — G1 src-dir collapse, Q030-Q033 structure moves, Q020 seven-preset eyeglass retire, Q042's three carves, Q010 proportion substitutions, and both retuned springs (dock 0.30/ζ0.82, drawer {0.32,0.80}) all verify against the working tree, and the untagged user-gated candidate state is reported honestly. The one real plan-vs-landed gap is a prose truth-up that was explicitly named as owed but never done: the dock spring's regenerated curve is 0.30/ζ0.82 while its self-declared 'mirror' comment still present-tense-describes the retired 0.68/ζ0.64 weighty register (and omits the transient preset). Two lesser items: a lone greenfield-no-meta regression reintroduced after 'global zero', and a dated 7.0.0 migration section on an untagged, still-user-gated cut.

## Findings (3)

### [major] stale-mirror-comment-desync

**Claim:** The dock-spring judgment-a value landed in the emitted curve (0.30/ζ0.82) but the co-located, self-declared "mirror" prose still describes the retired 0.68/ζ0.64 weighty register in present tense and omits the transient preset entirely — a named-owed truth-up that was never completed.

**Evidence:** src/styles/tokens/scheme-spring.css:25-26 declares "The SPRING_PRESETS table in springPresets.ts is the single source mirrored by these numbers", yet :31 states "dock: (0.68s, ζ=0.64) — the WEIGHTY iOS-27 gooey morph … slow inertial mass; the emitted curve is a monotone weighty settle". Source of truth src/composables/motion/spring/springPresets.ts:95-99 = response 0.3 / dampingFraction 0.82 / "A brisk liquid morph", and the emitted --spring-dock curve + --spring-dock-settle:0.19s (scheme-spring.css:99,143) match 0.30/0.82. Commit a7986987 changed the preset and 'tokens regenerated' but left the comment stale. The mirror lists 6 rows (smooth/snappy/bouncy/gentle/dock/press) while SPRING_PRESETS has 7 (transient missing). HANDOFF-ACTIVE-EXECUTION.md:540-541 explicitly names 'the stale 0.68/zeta-0.64 Dock comment in src/styles/tokens/scheme-spring.css' as an owed truth-up. Contradicts do-not-relitigate 'judgment-a dock 0.30/ζ0.82' (addenda/PLAN.md:34).

**Proposed:** build — a one-commit pre-tag prose truth-up: rewrite scheme-spring.css:31 dock row to (0.30s, ζ=0.82) brisk + add the missing transient row; fold into the existing doc-truth sweep pattern (cf. d0de60d9 'true-up the three stale blur-prose sites').

### [minor] meta-reintroduction-post-scrub

**Claim:** After the Q041 demeta scrub declared greenfield-no-meta 'at global zero' across src/demo/tests, a later commit reintroduced a tranche wave-name into the source comment corpus, breaking the zero.

**Evidence:** src/components/dialog/placement.css:93 reads '`glass-graded-halo` (name-locked jointly with BI.W-ENGAGE-AFFORD)'. This line was added by commit 189ae15c (graded box-following backdrop halo), which is AFTER 2d1584a5 (2026-07-17 06:50 'scrub … greenfield-no-meta at global zero'). Post-scrub grep of src for 'BI.W-' returns exactly this 1 hit; demo/ and tests/ are clean (0 hits), so it is an isolated regression in product source.

**Proposed:** fold-into-Q041 — a trailing one-line scrub before tag: reword placement.css:93 to drop the 'BI.W-ENGAGE-AFFORD' token (keep the 'glass-graded-halo' name-lock rationale without the wave id).

### [note] premature-version-finalization

**Claim:** package.json is stamped 7.0.0 and MIGRATION.md carries a dated '7.0.0 (2026-07-17)' section while no v7.0.0 tag exists and the cut is still user-gated (Q051 all-blank, V-A95 experiment-pending).

**Evidence:** package.json version=7.0.0; git describe=v6.0.0-57-g0cac3c8e (latest tag v6.0.0); MIGRATION.md:8 '## 7.0.0 (2026-07-17)'; docs/tranches/BI/addenda/JUDGMENT-ROSTER.md shows all 16 DECISION lines still '____' (only row 17 closed/retracted); src/components/aurora/Aurora.vue:291-293 isolation 'Revert if the slab persists' (V-A95 unconfirmed). Plan §7 close definition requires V-A95 resolved + user-judgment batch RESOLVED before THE CUT.

**Proposed:** retire (accept) or minor build — the MIGRATION.md CORRECTION notes are careful and honestly distinguish ships-through-v6.0.0 vs removed-at-7.0.0; the only forward-leaning artifact is the concrete date on an untagged major. Optionally mark the 7.0.0 heading '(unreleased)' until the tag lands.

