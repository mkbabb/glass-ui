// p10-engine-dot-lead.mjs — S74c (pass 10, P9-R1 (a)): the landed floor engine keeps a root-relative
// spelling's `./` lead when its holder moves. FLOOR.md F-2 (P4-F3): "when its holder moves, a
// root-relative spelling is kept verbatim". The engine's root-relative branch re-spells the path from
// its target with only a `../` lead kept, so `"./dist/index.d.ts"` (entries.mjs:71, the root export's
// value) became `"dist/index.d.ts"` when S74d moved entries.mjs, and the image check refused the step
// (two edges lost). The lead now keeps `./` as it keeps `../`. Defect class: a floor sentence the
// engine contradicts; the docs floor (floor/lib/move.mjs:168) carries the same line (open gap for the
// agglomeration: a floor row, outside this route seat's fences).
export const why = "P9-R1 (a): the landed move engine keeps a `./` lead on a root-relative path when its holder moves (FLOOR.md F-2, P4-F3: a root-relative spelling is kept verbatim); it kept only a `../` lead, which turned entries.mjs's `\"./dist/index.d.ts\"` into `\"dist/index.d.ts\"` and refused S74d at the image check";
export const edits = [
    {
        file: "scripts/structure/lib/move.mjs",
        why: "the lead of a root-relative spelling is kept whole: `./` as well as `../`",
        from: "            const lead = e.via === \"root-absolute\" ? \"/\" : (bare.match(/^(\\.\\.\\/)*/)?.[0] ?? \"\");\n",
        to: "            const lead = e.via === \"root-absolute\" ? \"/\" : (bare.match(/^(?:\\.\\/|(?:\\.\\.\\/)*)/)?.[0] ?? \"\");\n",
    },
];
