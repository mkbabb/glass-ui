// Shared pure text-detection primitives. This barrel is descriptive utility code;
// it carries no executable identity, fixed success roster, or completion status.

export { stripComments, stripJs } from "./comment-strip.mjs";
export {
    rowCells,
    isSeparatorRow,
    findHeaderColumns,
    isHeaderRow,
} from "./markdown-table.mjs";
export { isWaveId, isVisualClass } from "./wave-id.mjs";
