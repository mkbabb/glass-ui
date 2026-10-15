// plants/cells-tag.mjs: the self-test of makeReport().guard's --cells skip test (H4, entry 5). An anchored
// re-run filter names a cell without its engine tag ('^(x)$'); a block whose names carry the tag
// ('x-unshimmed') must run, and its cell must be recorded. Before entry 5 the block was skipped and the
// re-run reported 0/0 cells. Engine-independent; no browser.
//   node plants/cells-tag.mjs        → exit 0 when the tagged cell is recorded, 1 when the block is skipped
process.argv.push("--cells", "^(x)$");
const { makeReport } = await import("../lib.mjs");
const rep = makeReport("GT", { label: "cells-tag-plant" });
await rep.guard("webkit", ["x-unshimmed"], async () => { throw new Error("planted page crash"); });
const wk = rep.cells.find((c) => c.cell === "x-unshimmed");
console.log(wk ? "OK   GT  cells-tag  the tagged cell is recorded under an untagged anchored filter" : "BAD  GT  cells-tag  the block was skipped (0/0 cells)");
process.exit(wk ? 0 : 1);
