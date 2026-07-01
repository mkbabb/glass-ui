# VERIFY-PLAN — adversarial verification of AMENDED-GESTALT-PLAN.md

**Verdict: PASS.** Zero CRITICAL / zero MAJOR residue. 4 MINOR observations (cosmetic/inherited, none blocking).

## (1) All 16 rulings applied (plan-line cited)

| R | applied | cite |
|---|---|---|
| R1 dead-cut single owner (10.5 owns delete+AppSwitcher; 4.3→verify; `10.5∈preconds(4.3)`) | ✓ | `:85` (4.3 row + precond), `:322` |
| R2 `10.5∈preconds(6.4)`, reversed prose struck | ✓ | `:179` |
| R3 F8 = build/meta/warm-identity, NO proof:close | ✓ | `:40`,`:153`; grep confirms 0 uses |
| R4 `useDockFission` drain = 4.5 alone | ✓ | `:87`,`:287` |
| R5 3.2→3.3 `shape.css:208-249` deleted / `cards.css:359` LIVE; §9 tally | ✓ | `:63`,`:324` |
| R6 DOCK_SPRING byte-frozen wins; 5.2 retune DELETED | ✓ | `:76-80`,`:84` |
| R7 Chart KEEP-BOOKED, out of active plan | ✓ | `:46`,`:249-253` |
| R8 dead-knob witnesses protected through 12.13 | ✓ | `:160` |
| R9 tint-recipe owner UNIFY + `@utility glass-fill`; `-tinted`+9 re-spells DELETE; UNIFY∈preconds(3.13,3.14) | ✓ | `:55-57`,`:64`,`:66`,`:67` |
| R10 master table first artifact, ONE count | ✓ | `:19-36` |
| R11 row 0.1 corrected (over-claim struck) | ✓ | `:193-196` |
| R12 gate target single-sourced (360→~250; ~40-60 DIRECTION) | ✓ | `:26`,`:219-221` |
| R13 per-wave Fable inline (no OWED flag) | ✓ | master-table cols |
| R14 `goo-blob→blob` pinned to BH B2 reshape (DEV-B row 7) | ✓ | `:316` |
| R15 F9 Substrates/Viz exists (9 families) | ✓ | `:173` |
| R16 all sub-items (C-SAFARI drop-w-trigger, property-regs exempt, BH grammar ids, BD-cut fact, HEAD-drift, DesignSync provisioning, MN-1 idiom reversal, WATCH-3 press, capstone≤4) | ✓ | `:69-72`,`:107`,`:125-133`,`:302`,`:31`,`:162`,`:67`,`:108`,`:31` |

## (2) Union completeness
- **DEV-A1 23 actives** — all homed (F2 0.7/3.1/3.3/3.5/3.10 · F3 4.1/4.3/4.4/4.5/4.6/4.7/4.9/4.10/8.2 · F7 4.11 · F9 6.1/6.3/6.4/6.5/6.6/6.8/6.9 · BH 9.1→DEV-B row12). ✓
- **DEV-A2 actives** — all homed (10.1/10.2/10.5/10.6/10.8/10.10/10.11/10.15/10.19/10.23 · 12.4a/12.4b/12.9/12.13(=12.3) · 13.2 · 14.1/14.3 · 16.1/16.2/16.3 · 17.1(=17.2)/17.4/17.5/17.6(=17.3) · 19.1; 13.3/12.10/12.11/12.12→§4; 18.x/19.2→BH). ✓
- **DEV-C 23 specs** — all homed: F2.1→3.13 · F2.2→3.14 · F2.3→3.15 · F4.1→14.1 · F5.1→10.6 · F5.2→10.10 · F5.3→10.26 · F6.1/6.2/6.3→BH-grammar · F6.4→§4 KEEP-BOOKED(R7) · F6.5→10.27 · F7.1→16.5 · F7.2→16.6 · F7.3→16.7 · F7.4→17.6-amend · F8.1-8.7→12.13-12.19. ✓
- **DEV-B BH 14** — referenced (count `:24` + 3 grammar rows in F6); rows individually enumerated in DEV-B §1.1 + fold Lane 3 (not re-tabled in plan). See MINOR-2.
- **15 cursor rows spot-checked** vs EXECUTION-PROGRESS.md (0.7,3.2,3.12,4.2,5.1,5.2,6.7,7.1,8.1,10.13,10.21,12.6,13.5,15.5,18.6) — every one homed (merge/prune-clause/§4/BH). No row lost.

## (3) Counts true (recounted)
F1 1 · F2 9 · F3 9 · F4 2 · F5 5 · F6 7 · F7 7 · F8 15 · F9 9 = **64**. Matches `:23`. ✓

## (4) Preconds
R1 (`10.5∈4.3`), R2 (`10.5∈6.4`), R9 (`3.5∈{3.13,3.14}`) edges all present. Other edges (4.10←{4.1,4.9}; 8.2←4.1 before 4.3; 10.26←10.10←10.6←10.5; 16.5←16.6; 12.18←{12.14,12.15}) acyclic. See MINOR-3 (12.13↔12.14 step-decomposable pair).

## (5) fableArm/designSyncSurface
Every R13-flagged visual wave carries a NAMED Fable+DS (3.1,3.5,3.10,3.13,3.14,3.15,13.2,4.5,4.7,4.10,8.2,14.1,14.3,10.1,10.2,10.6,10.10,10.15,10.23,16.1,16.2,16.5,16.6,12.14,12.15,12.18,17.6,6.1,6.4,6.5,6.6,6.10,6.11,BH.W-MOTION-AXIS). Structural/mechanical rows correctly carry "—". ✓

## (6) No proof:close
grep: only the 3 "NO proof:close" negations (`:41`,`:153`,`:323`). No F8 gate uses it. ✓

## (7) Chart
Absent from active F-tables (only appears as a net-delta word inside 12.16 — see MINOR-4). Present in §4 KEEP-BOOKED `:249`. ✓

## (8) Protected set untouched
DOCK_SPRING byte-frozen (R6); 4.10 KEEP-VERBATIM; SPRING_PRESETS/per-spring clocks, `--glass-level`/`--glass-depth`, in-srgb surface-tint fence, useSurfaceAxis (additive re-export), BE/BF ledger (closed), live-verified-ledger/fold-ledger/profile:budget (R8 true-positive set) — none re-plumbed. `createCanvasLifecycle` carve (10.11) is byte-isomorphic colocation w/ WS8 fence re-pin; CRIT-3 (88%) raised no protected-set violation. ✓

## MINOR observations (non-blocking; no re-develop needed)
- **M1** R10 prose says "DEV-C's 15 homeless" but fold-map `:282` assigns 20 ids (17 BG + 3 BH). Prose-count mismatch only; every wave IS homed.
- **M2** The BH 14 band rows are not individually enumerated in the plan's master table (3 grammar rows shown + count reference to DEV-B §1.1); homed in the binding input + fold Lane 3.
- **M3** 12.13↔12.14 precond pair reads as a wave-level 2-cycle (12.13←12.14; 12.14←"detector kit = F8.1 step 1 = 12.13 step 1"). Resolves at step granularity; inherited verbatim from DEV-C F8.1/F8.2, not a fold-introduced deadlock.
- **M4** 12.16 net-delta clause still lists "chart" (`demigrate+Siri+chart`) though Chart is KEEP-BOOKED-out (R7) — no chart add lands in-tranche; inherited from DEV-C F8.4, cosmetic.
