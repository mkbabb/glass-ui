// reread.mjs: recomputes every enter/leave reading in logs/results/*.json from the saved
// rows (rows/<tag>/<id>.<route>.json.gz) with the current readMotion, in place.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { join } from "node:path";
import { EX, readMotion, setViewport } from "./lib.mjs";
import { SPECS } from "./specs.mjs";
const dir = join(EX, "logs/results");
for (const f of readdirSync(dir).filter((x) => x.endsWith(".json"))) {
    const r = JSON.parse(readFileSync(join(dir, f), "utf8"));
    setViewport(f.includes(".phone.") ? 390 : 1440, f.includes(".phone.") ? 844 : 900);
    const tag = f.replace(/\.(full|glass|first2)\.json$/, "");
    for (const [id, s] of Object.entries(r.surfaces)) {
        const spec = SPECS.find((x) => x.id === id) || {};
        const rowsOf = (n) => { const p = join(EX, "rows", tag, `${id}.${n}.json.gz`); return existsSync(p) ? JSON.parse(gunzipSync(readFileSync(p))) : null; };
        const e = rowsOf("enter");
        if (e) s.enter = readMotion(e, "s", "open", spec.inPlace ? "inplace" : "enter");
        for (const [k, v] of Object.entries(s.routes || {})) {
            const rr = rowsOf(k);
            if (rr && v.verdict !== "n/a" && v.verdict !== "ERR") { const note = v.note; s.routes[k] = readMotion(rr, "s", "leave", spec.inPlace ? "inplace" : "leave"); if (note) s.routes[k].note = note; }
        }
    }
    writeFileSync(join(dir, f), JSON.stringify(r, null, 1));
}
console.log("reread done");
