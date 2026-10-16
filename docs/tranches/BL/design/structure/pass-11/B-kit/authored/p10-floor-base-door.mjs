// p10-floor-base-door.mjs — S74e (pass 10, P9-R1 (a), LAW §5): after S74d the floor's tree model is
// lib's base module lib/tree/. It gets its door (B7), holding only re-exports (B14) of the names read
// from outside it (B11), and every crossing into it goes through that door (B1): the lib door, the
// move engine, the step classifier and the graph.
export const why = "P9-R1 (a), LAW §5: lib/tree/ (the floor's tree model: file set and zones, entry record, resolution, placement, symbol origins) gets its door, and the lib door, move.mjs, classify.mjs and graph/graph.mjs read it through that door, so lib reads graph/ through graph's door and graph/ reads the tree model through tree's: no parent<->child value SCC at module grain";

const DOOR = `// tree/ — the tree model the floor's graph is built on: the file set, its zones and the floor's own
// home (tree), the entry record (entries), how a specifier resolves (resolve), units and placement
// (placement), and symbol origins (symbols). It reads nothing else of the floor.
export {
    compareToPackage,
    declarationProgram,
    distOf,
    libraryEntryMap,
    loadRecord,
    readJson,
    recordCssTargets,
    recordEntries,
    recordInputs,
    recordTerminal,
    validateRecord,
} from "./entries.mjs";
export { CONTAINERS, dirUnits, isSlot, placeAll, proposedPath, publicationAnchor } from "./placement.mjs";
export { discoverAliases, expandGlob, globToRegex, isGenerated, makeResolver } from "./resolve.mjs";
export { makeOrigins } from "./symbols.mjs";
export { DEFAULT_ROOT, floorHome, ledgerPath, openTree, pinPath, recordPath, ZONES, zoneOf } from "./tree.mjs";
`;

const LIB = "scripts/structure/lib/index.mjs";
const B1 = "a crossing into lib/tree/ goes through its door (B1)";
export const edits = [
    { file: "scripts/structure/lib/tree/index.mjs", why: "the tree model's door (B7, B14): the names read from outside it (B11)", create: DOOR },
    { file: LIB, why: B1, from: "} from \"./tree/entries.mjs\";\n", to: "    CONTAINERS,\n    DEFAULT_ROOT,\n    dirUnits,\n    isSlot,\n    makeOrigins,\n    openTree,\n    pinPath,\n    placeAll,\n    proposedPath,\n    publicationAnchor,\n    recordPath,\n    ZONES,\n    zoneOf,\n} from \"./tree/index.mjs\";\n" },
    { file: LIB, why: B1, from: "export { CONTAINERS, dirUnits, isSlot, placeAll, proposedPath, publicationAnchor } from \"./tree/placement.mjs\";\n", to: "" },
    { file: LIB, why: B1, from: "export { makeOrigins } from \"./tree/symbols.mjs\";\n", to: "" },
    { file: LIB, why: B1, from: "export { DEFAULT_ROOT, openTree, pinPath, recordPath, ZONES, zoneOf } from \"./tree/tree.mjs\";\n", to: "" },
    { file: "scripts/structure/lib/move.mjs", why: B1, from: "import { dirUnits } from \"./tree/placement.mjs\";\nimport { zoneOf } from \"./tree/tree.mjs\";\nimport { globToRegex } from \"./tree/resolve.mjs\";\n", to: "import { dirUnits, globToRegex, zoneOf } from \"./tree/index.mjs\";\n" },
    { file: "scripts/structure/lib/classify.mjs", why: B1, from: "import { makeOrigins } from \"./tree/symbols.mjs\";\n", to: "import { makeOrigins } from \"./tree/index.mjs\";\n" },
    { file: "scripts/structure/lib/graph/graph.mjs", why: B1, from: "import { floorHome, ledgerPath, openTree, zoneOf } from \"../tree/tree.mjs\";\nimport { dirUnits } from \"../tree/placement.mjs\";\nimport { distOf, loadRecord } from \"../tree/entries.mjs\";\nimport { discoverAliases, expandGlob, globToRegex, isGenerated, makeResolver } from \"../tree/resolve.mjs\";\n", to: "import { dirUnits, discoverAliases, distOf, expandGlob, floorHome, globToRegex, isGenerated, ledgerPath, loadRecord, makeResolver, openTree, zoneOf } from \"../tree/index.mjs\";\n" },
];
