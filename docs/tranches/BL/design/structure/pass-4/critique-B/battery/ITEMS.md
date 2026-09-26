# critique-B · pass 4 · battery map

Seat: fresh critic, claude-opus-5-5. Written from REGISTRY §P2-6.4, §P2-6.5, §P3-8, §P3-9 and RULINGS.md only, before reading `pass-4/B-kit/` or `pass-4/B-proto.md`. Hashed in `../BATTERY-HASH.txt`.

Files: `plants.mjs` (seal-judged plants, driven by `run-plants.mjs` through an adapter written after the hash), `probes.mjs` (file-system measurements), `tree-probes.sh` (command probes; the route's commands are passed in as `SEAL`, `CASCADE`, `BUILD`), `reorder.mjs` (the cascade plant).

## §P3-8.4 plants

| plant | ids | expect |
|---|---|---|
| unit file reaching a kernel module's interior past its door | K-INT, K-INT-T (type-only); legal control K-DOOR-L | caught; control clean |
| sibling module reaching a nested module's interior inside one unit | N-INT | caught |
| type-only cycle between sibling modules | T-CYC (units), T-CYC-N (nested); tooth V-CYC | caught |
| same-directory file cycle (cB O-1) | F-CYC, F-CYC-T | caught, or the law states it legal (B-01 accepts either) |
| silent return on a missing file; `.catch(() => null)` on a live target | MASK-RET, MASK-RETN, MASK-TRY; MASK-CATCH, MASK-CATCH-D; probe PR-UEMIT, PR-MASK | caught; `vite.utility-emit.ts` throws |
| placeholder dir outside src and scripts | PH-tests (`tests/utils`), PH-demo (`demo/misc`), PH-visual (`tests-visual/v2`), PH-tests-helpers; control PH-src; PH-file, PH-foreign; probe PR-NAMES | caught |
| reorder of two property-sharing rules on co-occurring classes | REORDER (`reorder.mjs` via tree-probes.sh) | cascade RED |
| a second pin path | PIN-OPT, NOPIN, NPMNOPIN, PIN-FILES, PIN-ENV | one path only |

## One probe per checklist item that can fail

| item | probes |
|---|---|
| S-01 | kit committed (git, checkout) |
| S-02 | K-REEX; seal kernel clause at 0 |
| S-03 | PR-SLOT, SLOT-13, SLOT-501, PR-DOCKT (P3-R3); PR-KEYS `./aurora-config` (P3-R5); PR-TELE (P3-R6); `verify:package` against a ruled datum (P3-R9/P4-R3) |
| S-04..S-08 | SELF (S-06), WALK (S-07); replayed build/pack |
| S-09 | chain replay `--twice`, GATE-PURE |
| S-10 | REORDER (P4-F7); per-step FD-5 in the chain logs (P4-F6) |
| S-11 | vitest on the replayed tree, FD-6-class failures |
| S-12 | Playwright executed on the chip-paint band, π |
| S-13 | merge test record exists (closed item; re-open check only) |
| S-14 | MASK-*, PR-UEMIT |
| B-01 | every seal clause GREEN on the replayed tree; teeth D-CODE, D-DUAL, B-13F, B-501, V-CYC; PR-B12, PR-500, PR-DOORLESS; F-CYC |
| B-02 | K-REEX, D-DUAL |
| B-03 | SELF |
| B-04 | T-OUT, T-WRONG; control T-OWN-L |
| B-05 | SCR |
| B-06 | (closed; re-open check via seal's bin clause GREEN) |
| B-07 | PH-*, PR-NAMES |
| B-08 | PR-ACCENT, REORDER, chip-paint spec run |
| B-09 | G-RULE, TH-RULE |
| B-10 | PR-500 (B-S11), PR-SAFARI (B-S15), PR-TV (B-S16), PR-KEYS (B-S10) |
| B-11 | PIN-* |
| B-12 | PR-DOORS (door cost §P3-4), K-INT / N-INT / T-CYC catches |
| B-13 | PR-COUNT |
