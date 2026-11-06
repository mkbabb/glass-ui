// Count rows that read "nothing to scroll" (sw = cw and, where read, sh = ch) yet rest non-uniform, in any
// banked JSON under <dir> (r6a/r6f shapes: objects carrying sw, cw, uniform, radii).
//   node docs/release-10.1.5/scripts/critic-7-stale.mjs <dir> [file-prefix ...]
import { readFileSync, readdirSync } from "node:fs";
const [dir, ...pre] = process.argv.slice(2);
const walk = (x, path, out) => {
    if (Array.isArray(x)) x.forEach((y, i) => walk(y, `${path}[${i}]`, out));
    else if (x && typeof x === "object") {
        if ("sw" in x && "cw" in x && "uniform" in x) out.push({ path, ...x });
        for (const [k, v] of Object.entries(x)) walk(v, `${path}.${k}`, out);
    }
    return out;
};
for (const f of readdirSync(dir).filter((f) => f.endsWith(".json") && (!pre.length || pre.some((p) => f.startsWith(p)))).sort()) {
    const rows = walk(JSON.parse(readFileSync(`${dir}/${f}`, "utf8")), "", []);
    const stale = rows.filter((r) => r.sw === r.cw && (r.sh === undefined || r.sh === r.ch) && !r.uniform);
    console.log(`${f}: rows ${rows.length}, nothing-to-scroll non-uniform ${stale.length}`);
    for (const s of stale.slice(0, 6)) console.log(`   ${s.path} sw/cw ${s.sw}/${s.cw} radii ${s.radii}`);
}
