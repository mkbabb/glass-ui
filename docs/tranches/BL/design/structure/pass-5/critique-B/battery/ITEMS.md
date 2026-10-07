# critique-B pass 5 · battery map

Seat: fresh critic, model claude-opus-5-5. Written and hashed BEFORE reading `pass-5/B-kit/` or `pass-5/B-proto.md`.
Checklist: REGISTRY §P3-9 text, status §P4-9, 27 items; bar §P3-8.4 + §P4-8.4.

Runner: `run-plants.mjs --root <tree> --adapter <adapter> --set <plants.mjs|regress.mjs> [--group]`. The adapter is
written after the hash and decides nothing: it returns the route gate's own clause table.

## §P4-8.4 plants (plants.mjs)

| family | plants | expect | item |
|---|---|---|---|
| S14-<zone>-FS-<shape>-<lit/par> | 8 fs shapes (RET, RETN, TERN, POS, POSB, TRY, TRYE, ASYNC) × literal/parameter × 5 zones = 80 | B17 | S-14 |
| S14-<zone>-LD-<shape>-<lit/par> | 6 load shapes (CATCH, CATCHU, THEN2, FNVAL, FNMAP, TRYAW) × literal/parameter × 5 zones = 60 | B17 | S-14 |
| S14-<zone>-CTL-* | plain read, plain load, rethrowing try: 15 legal controls | clean | S-14 |
| PH5-* | 14 placeholder/provenance names on split modules (dock, a tests dir, a demo dir) + one placeholder dir | any | B-07, B-10 |
| VIS-* | 3 carved visual specs outside the program's naming/slot + 1 legal | any | B-10 (B-S16) |
| DIR13-* / SLOT13-dock | the fullest <=12 dir per zone filled to 13; GlassDock's dir; dock/__tests__ to 13 | any | B-01, B-10, S-03 (P4-R5) |
| B2-<zone>-* | a consumer reach to a chip private: relative, type-only, dynamic, re-export, ?raw, nested non-entry door, package deep path; vi.mock; import.meta.glob; legal entry and in-unit controls | B2 | B-01 (P4-R1, P4-R2) |

## Regressions (regress.mjs)

Pass 4's hashed battery (`pass-4/critique-B/battery/plants.mjs`, amendment-1 hash `08a0ec97…`) and pass 4's extra
plants, imported by path: K-INT, K-INT-T, K-DOOR-L, N-INT, T-CYC-N, T-CYC, V-CYC, F-CYC, F-CYC-T, MASK-*, PH-*, SELF,
WALK, T-OUT, T-WRONG, T-OWN-L, SCR, K-REEX, G-RULE, TH-RULE, D-CODE, D-DUAL, B-13F, B-501, SLOT-13, SLOT-501, LOCAL-L;
X-TERN, X-TRYREAD, X-THEN2, X-FNVAL, X-TRYAWAIT, X-ELSE, X-FOREIGN, X-SCR, X-TERN-LIT, X-FNVAL-D. S-14 regressions must
name B17.

## Cascade plants (reorder.mjs, through tree-probes.sh)

- `acc`: pass 4's risky pair (accent-tone after glass-chip). RED expected.
- `out`: a reorder outside the listed rung (P5-F3). RED (UNLISTED) expected under the route's listing.

## One probe per item that can fail

| item | probe |
|---|---|
| S-01 | committed kit equals the kit the route ran: `git status` of `pass-5/B-kit` and `git diff HEAD` of it empty at judgment |
| S-02 | gate B8 0 and B9 lines; P4-K-REEX caught |
| S-03 | P3-R3 slots via BOUNDS-DIR (kind slot rows) and SLOT13-dock; P4-R5 dock/__tests__ count after the split; P3-R5 `./aurora-config` key; P4-R3 RATCHET against a ruled datum row; P4-R4 CSS-DIST |
| S-04, S-05 | gate GREEN for FD-1; FD-2 stop records in the replay log (addedPairs) |
| S-06 | P4-SELF |
| S-07 | P4-WALK |
| S-08 | CSS-DIST (no forwarder, export keys real) |
| S-09 | replay `--twice` MATCH, rerun no-op, GATE-PURE, RESTORED after every battery run |
| S-10 | REORDER-acc, REORDER-out, CASCADE-RESTORE |
| S-11 | vitest on the replayed tree: every failure in a named class |
| S-12 | the full graph-selected browser run on the final tree (§P4-8.4), committed record checked |
| S-13 | not re-run (closed in pass 3; nothing in pass 5 touches G) |
| S-14 | 140 S14 plants + 15 controls + regressions; MASK census against the gate |
| B-01 | gate: all 18 clauses GREEN; BOUNDS-DIR, BOUNDS-LOC, B2-REACH censuses at 0 or ruled; DIR13, B2 plants |
| B-02 | P4-K-REEX, P4-D-DUAL |
| B-03 | P4-SELF |
| B-04 | P4-T-OUT, P4-T-WRONG, P4-T-OWN-L |
| B-05 | P4x-X-SCR |
| B-06 | gate B13 0 |
| B-07 | PH5-*, P4-PH-*, P4x-X-FOREIGN, PH-NAMES census against B15 |
| B-08 | REORDER-acc; accent-tone at its rung |
| B-09 | P4-G-RULE, P4-TH-RULE |
| B-10 | BOUNDS-LOC 0 or a written counterexample per file; BOUNDS-DIR 0; PW-PROGRAM missing 0; VIS-* |
| B-11 | PIN-OPT, NOPIN, OFFSWITCH |
| B-12 | answered in pass 3; door plants regress |
| B-13 | closed; not re-opened unless the replay base moves |
