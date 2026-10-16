// authored/overlay-unrelay.mjs — AUTHORED input to derive/edits.mjs (step S1d, pass 4).
//
// P3-R6 places `_shared/overlay/isTeleportedTarget.ts` by its readers. Its one reader is
// dock's `useDockState.ts`, which imports the file itself; nothing reads the name through
// the overlay door. The door's re-export is what would close `_shared/overlay ↔ dock` (and
// `menu` through it) once the file moves: measured, the move alone adds 3 co-cyclic pairs
// under FD-2, the move after this row adds 0. B11 says an internal door publishes only names
// something outside its module reads, so the re-export leaves before S2 places the file.
// The two comments that say the file sits beside the writer are made true for where F-7
// puts it (the stamp's reader lives in dock, its one caller).

export const why = "B11/P3-R6: the overlay door drops the isTeleportedTarget re-export no reader uses, so S2 places the file by its one reader (dock) with no FD-2 growth; the two comments naming its place follow it";

export const edits = [
    {
        file: "src/components/_shared/overlay/index.ts",
        why: "B11: no file reads isTeleportedTarget through this door; the relay would close overlay↔dock under FD-2 once P3-R6 places the file",
        from: 'export { isTeleportedTarget } from "./isTeleportedTarget";\n',
        to: "",
    },
    {
        file: "src/components/_shared/overlay/participation.ts",
        why: "the comment names the reader's place; F-7 puts it with its one caller in dock",
        from: " * `isTeleportedTarget()` (beside this file) is the reader.",
        to: " * `isTeleportedTarget()` (in dock, beside its one caller) is the reader.",
    },
    {
        file: "src/components/_shared/overlay/isTeleportedTarget.ts",
        why: "the comment claimed a placement the law does not give it (P3-R6: placed by its readers)",
        from: " * It lives HERE, beside `overlayContentAttrs()`, because this predicate and that\n * writer are two halves of one contract: the reader parsed an attribute pair\n * that five hand-written call sites in five different files were each spelling\n * for themselves. Sitting in `dock/` it was a reader with no visible writer.\n",
        to: " * It is the reader half of the contract whose writer is `overlayContentAttrs()`\n * in `_shared/overlay/`, and it lives with its one caller, the dock (P3-R6: a\n * file is placed by its readers).\n",
    },
];
