// authored/test-slots-2.mjs — AUTHORED input to derive/edits.mjs (step S32, R-3).
//
// S24 and S26 colocated 81 more tests. Two more source walkers now meet a unit's
// `__tests__/` slot as if it were the unit's source (S16's finding, again): the route grammar
// census of src/ reads two motion tests' tempo literals as restated constants, and the dialog
// knob census reads the colocated ModalOverlay test's `backdrop` word. Each walker skips the
// slot, as the harness does (tests/harness/source.ts).

export const why = "R-3: two more source walkers skip the __tests__ slot, as the harness does";

export const edits = [
    {
        file: "tests/styles/route-motion.test.ts",
        why: "the route grammar census reads src/ source, not its test slots",
        from: "                if (statSync(path).isDirectory()) walk(path);\n",
        to: "                if (statSync(path).isDirectory()) { if (entry !== \"__tests__\") walk(path); }\n",
    },
    {
        file: "tests/components/dialog/dialog-dismiss.test.ts",
        why: "the dialog knob census reads the dialog's source, not its test slot",
        from: "        return statSync(full).isDirectory() ? walk(full) : [full];\n",
        to: "        if (statSync(full).isDirectory()) return entry === \"__tests__\" ? [] : walk(full);\n        return [full];\n",
    },
];
