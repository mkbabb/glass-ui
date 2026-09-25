// authored/r1-register.mjs — AUTHORED input to derive/edits.mjs (step S21; RULINGS R-1).
//
// R-1: `gate-register`'s sha-pinned closed-record roster is RETIRED with the register, and
// the collapse wave (W-REGISTER-COLLAPSE) "lands BEFORE the structure migration" and "names
// no file path a move would invalidate". At HEAD the register is still in the tree: it reads
// closed BK/BJ records that name 17 single-subject tests by path, so every R-3 move of those
// tests reds it (S-6: it went red in every pass-1 prototype). This step is the retire half of
// R-1's precondition, placed first among the test moves so the chain runs on the tree R-1
// assumes. The fresh roster is the collapse wave's to author (it binds executables and
// invariants, not paths); this route writes none. Closed records are not edited.
// F-1 readers of the two files: `scripts/gate-register.mjs` is imported only by its test,
// named by no package.json script and no CI token; the test is collected by vitest only.

export const why = "R-1 (precondition of the structure migration): gate-register and its test retire with the register; the collapse wave's fresh roster names no path";

export const edits = [
    { file: "scripts/gate-register.mjs", why: "R-1: retired with the register (F-1: one reader, its own test)", remove: true },
    { file: "tests/gates/gate-register.test.ts", why: "R-1: the register's test retires with it", remove: true },
];
