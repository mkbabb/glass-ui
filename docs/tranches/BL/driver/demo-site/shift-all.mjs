// The hover-shift gate (docs/tranches/BL/audit/hover-shift/tools/shift-gate.mjs, read from the main checkout) on a list of
// routes in one run: one browser, a new context per route, everything closed in
// finally (the gate's own lib does both). Same states, same diff, same verdict per
// route; one JSON line per route.
//
// Machine law: run only through `~/.claude/guard/guarded`, never `--light`.
// usage: node shift-all.mjs --base http://127.0.0.1:5451 --routes /a,/b --out rows.jsonl [--cell fine]
import fs from "node:fs";
import { withBrowser, withContext, CELLS, exercise, classify, gotoRoute } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/audit/hover-shift/tools/lib.mjs";

const args = Object.fromEntries(
    process.argv.slice(2).reduce((acc, a, i, all) => {
        if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]]);
        return acc;
    }, []),
);
const BASE = args.base ?? "http://127.0.0.1:5451";
const ROUTES = (args.routes ?? "/").split(",");
const cellId = args.cell ?? "fine";
const out = fs.createWriteStream(args.out, { flags: "a" });

await withBrowser("chromium", async (browser) => {
    for (const route of ROUTES) {
        const report = { route, cell: cellId, shifts: [], moves: [], exercised: 0 };
        try {
            await withContext(browser, "chromium", CELLS[cellId], async (P) => {
                await gotoRoute(P, BASE, route);
                const cands = (await P.page.evaluate(() => window.__hs.candidates())).slice(0, 200);
                for (const c of cands) {
                    const res = await exercise(P, c, { crops: false, press: true });
                    const cl = await classify(P.page, c, res);
                    report.exercised++;
                    for (const s of cl.shifts) report.shifts.push({ target: c.label, state: s.state, items: s.items.slice(0, 4), scroll: !!s.scroll });
                    for (const m of cl.moves) if (m.rel === "target" && m.overlap?.length) report.moves.push({ target: c.label, state: m.state, dR: m.dR });
                    if (res.states?.navigated) await gotoRoute(P, BASE, route);
                }
            });
        } catch (e) {
            report.error = String(e?.message ?? e).slice(0, 200);
        }
        out.write(JSON.stringify(report) + "\n");
        console.log(`${report.error ? "ERR " : report.shifts.length ? "SHIFT" : "pass "} ${route} exercised=${report.exercised} shifts=${report.shifts.length}${report.error ? " " + report.error : ""}`);
    }
});
out.end();
