// plants/guard-engine.mjs: the self-test of makeReport().guard's per-engine error record (H4, entry 4).
// Chromium records cell `x`; the Playwright WebKit block for the same name throws. The WebKit cell must be
// recorded as FAIL ("not measured: …"), never dropped. Engine-independent; no browser.
//   node plants/guard-engine.mjs        → exit 0 when the WebKit error is recorded, 1 when it is lost
import { makeReport } from "../lib.mjs";
const rep = makeReport("GT", { label: "guard-plant" });
await rep.guard("chromium", ["x"], async () => rep.add({ engine: "chromium", cell: "x", pass: true, summary: "recorded" }));
await rep.guard("webkit", ["x"], async () => { throw new Error("planted WebKit block error"); });
const wk = rep.cells.find((c) => c.engine === "webkit" && c.cell === "x");
console.log(wk && !wk.pass && /planted/.test(wk.summary) ? "OK   GT  guard-engine  the WebKit block error is recorded as FAIL" : "BAD  GT  guard-engine  the WebKit block error was dropped (cell absent)");
process.exit(wk && !wk.pass ? 0 : 1);
