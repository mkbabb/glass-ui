// authored/p6-kernel-tests.mjs — AUTHORED input to derive/compose.mjs (step S68; LAW §9 pass 6).
// The kernel container's own files (axes, interaction, primitive, selection, class-names,
// useMotionAxis) have one test slot, src/components/_shared/__tests__. The two cn tests whose
// subject is class-names.ts move there, by row: the floor engine refuses the move as written
// (FD-2: through the root door a test in _shared would make src and _shared co-cyclic), so the
// moved test reads cn from its home file, as a colocated test reads its home's inside.
export const why = "LAW §9 (pass 6): the cn tests' subject is _shared/class-names.ts, so they live in the kernel container's test slot and read cn from it (through the root door the floor's FD-2 refuses the home)";
const MOVES = [
    ["tests/components/_shared/classNames.test.ts", "src/components/_shared/__tests__/classNames.test.ts"],
    ["tests/components/_shared/cn.test.ts", "src/components/_shared/__tests__/cn.test.ts"],
];
export const reasons = Object.fromEntries(MOVES.flatMap(([f, t]) => [
    [f, `moves to ${t}`],
    [t, "its subject is _shared/class-names.ts; cn is read from the home file (a colocated test reads its home's inside)"],
]));
export function compose({ read }) {
    const out = {};
    for (const [from, to] of MOVES) {
        const text = read(from);
        const at = `import { cn } from "@glass/index";`;
        if (text.split(at).length !== 2) throw new Error(`${from}: the cn import moved`);
        out[from] = null;
        out[to] = text.replace(at, `import { cn } from "../class-names";`);
    }
    return out;
}
