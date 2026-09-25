#!/usr/bin/env node
// rows/r1-register-retire.mjs — floor row R-1 (P4-F1): W-REGISTER-COLLAPSE's first act, the
// retire. RULINGS R-1: `gate-register`'s sha-pinned closed-record roster is RETIRED with the
// register, and the collapse "lands BEFORE the structure migration" and "names no file path a
// move would invalidate". At HEAD the register reads closed BK/BJ records that bind rostered
// rows to test files by path (SEAT-BINDING.json: `tests/gates/tabs-seam.test.ts`, …), so any
// R-3 move of one of those tests reds it (S-6, P3-G6). The retire is therefore a floor
// precondition, cut first, before any row or move: every route starts from a tree without
// it, and no route chain carries it. The fresh roster is the collapse wave's to author; this
// row writes none, and the closed records are never edited.
// F-1 readers of the two files: `scripts/gate-register.mjs` is imported only by its test; no
// package.json script, CI token or ledger row names either.
//   node rows/r1-register-retire.mjs --root <linked worktree>
import { openRow } from "./lib.mjs";

const row = openRow("r1-register-retire");
row.remove("scripts/gate-register.mjs");
row.remove("tests/gates/gate-register.test.ts");
row.commit("R-1: gate-register and its test retired with the register (W-REGISTER-COLLAPSE's retire)");
