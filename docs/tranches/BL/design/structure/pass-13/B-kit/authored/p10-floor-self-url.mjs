// p10-floor-self-url.mjs — S74b (pass 10, P9-R1 (a)): the one floor-runtime reference the move engine
// cannot carry. recordInputs (scripts/structure/lib/entries.mjs) hands the build its own path as
// `fileURLToPath(import.meta.url)`: F-1 reads it as a path-literal edge to the file itself, with no span,
// so the engine refuses any move of the file (`unrewritable-path`, S74c's dry run). Spelled as the
// URL of the file by name, the reference is a `new-url` edge with a literal span, which the engine
// carries like any other (the file moves with itself, so the span stays `./entries.mjs`). The value is
// the same absolute path.
export const why = "P9-R1 (a): entries.mjs names its own path for the build's watch list by an explicit file URL (`new URL(\"./entries.mjs\", import.meta.url)`), the same path, which F-1 reads as a new-url edge with a span; the bare `fileURLToPath(import.meta.url)` is an edge with no span, and the floor engine refuses to move a file that holds one (S74c moves entries.mjs into lib/tree/)";
export const edits = [
    {
        file: "scripts/structure/lib/entries.mjs",
        why: "the watch list names this reader by an explicit URL the floor can carry through a move",
        from: "    return [join(root, recordPath(root)), fileURLToPath(import.meta.url)];\n",
        to: "    return [join(root, recordPath(root)), fileURLToPath(new URL(\"./entries.mjs\", import.meta.url))];\n",
    },
];
