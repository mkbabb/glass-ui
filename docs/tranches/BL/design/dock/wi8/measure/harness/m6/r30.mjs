// r30.mjs <rows/m6-r30>: RU-37's reading, the twenty runs of return-30 per engine: each run's turn (rows after the
// cause, against the bound's rows), the largest gap between consecutive rows from the cause to the turn, the load.
// A run is late when it turns more than one row past the bound; it is a fault when a late run has no row gap over
// two rows (rows at cadence), an artefact when every late run has a gap that accounts for it.
import { readdirSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const dir = process.argv[2];
const J = new URL("./judge7.mjs", import.meta.url).pathname;
const by = {};
for (const run of readdirSync(dir).sort((a, b) => a - b)) {
    for (const f of readdirSync(`${dir}/${run}`)) {
        const out = JSON.parse(execFileSync("node", [J, `${dir}/${run}/${f}`, "--json"]).toString());
        for (const r of out) {
            const eng = r.meta.engine;
            const s = r.segs.find((x) => x.turn);
            const t = s?.turn?.L ?? s?.turn?.R ?? null;
            (by[eng] ||= []).push({ run: +run, load: r.meta.load, revRows: t?.revRows ?? null, boundRows: t?.boundRows ?? null, reverseMs: t?.reverseMs ?? null, gapRows: t?.gapRows ?? null, cause: t?.cause ?? null, viol: s ? s.viol.length : null });
        }
    }
}
for (const [eng, rs] of Object.entries(by)) {
    const late = rs.filter((x) => x.revRows != null && x.revRows > x.boundRows + 1);
    const fault = late.filter((x) => !(x.gapRows > 2));
    const verdict = !late.length ? "no late turn" : fault.length ? "FAULT" : "ARTEFACT";
    const over = rs.filter((x) => x.revRows != null && x.revRows > x.boundRows);
    console.log(`${eng}: ${rs.length} runs, past the bound ${over.length}, more than one row late ${late.length}, of them at cadence (no gap over two rows) ${fault.length} -> ${verdict}`);
    for (const x of rs) console.log(`  run ${x.run} load ${x.load?.join("/")} turn ${x.revRows} rows (bound ${x.boundRows}, ${x.reverseMs} ms) largest gap ${x.gapRows} rows cause ${x.cause}`);
}
