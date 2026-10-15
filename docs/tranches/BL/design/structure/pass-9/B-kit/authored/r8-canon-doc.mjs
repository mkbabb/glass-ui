// authored/r8-canon-doc.mjs — AUTHORED input to derive/edits.mjs (step S18; R-8, E-7).
//
// `scripts/lib/canon-doc.mjs` has no reader of any kind in F-1 (its one edge is the opaque
// ledger's own row about it), it names a README deleted at HEAD, and REGISTRY S-15 records
// it dead in four pass-1 families. R-8: a file with no reader is deleted unless it is an
// exported public symbol, which it is not. Its ledger row says "the E-7 delete row clears
// it", so the row leaves with the file (a stale ledger row fails the graph).

export const why = "R-8 / E-7: the dead scripts/lib/canon-doc.mjs is deleted with its opaque-ledger row";

export const edits = [
    { file: "scripts/lib/canon-doc.mjs", why: "R-8: no reader in F-1 (json-command, yaml-command and every module kind checked)", remove: true },
    {
        file: "scripts/structure/records/opaque-ledger.json",
        why: "the ledger row about the deleted file leaves with it",
        from: `        {
            "file": "scripts/lib/canon-doc.mjs",
            "kind": "path-literal",
            "spec": "src/components/handmark/README.md",
            "class": "stale",
            "reason": "canon-doc.mjs is dead (REGISTRY S-15) and names a README deleted at HEAD; the E-7 delete row clears it"
        },
`,
        to: "",
    },
];
