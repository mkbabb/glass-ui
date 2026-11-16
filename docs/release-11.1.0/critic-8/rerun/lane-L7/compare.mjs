// Lane L7: the at-rest look, branch against v11.0.0. For each engine, width, theme and
// shape, the cropped rest capture from each tree (same seed, same fixed colour) is compared
// pixel by pixel. A pixel differs when a channel moves by more than 48 of 255. A shape
// holds when at most 0.5 % of its crop differs.
//   node compare.mjs <out-dir>     writes <out-dir>/compare.json; exit 1 on any miss
import { createRequire } from "node:module";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const { PNG } = require(join(dirname(require.resolve("playwright-core")), "lib/utilsBundle.js"));
const out = process.argv[2];
const rows = [];
for (const engine of ["chromium", "webkit"])
    for (const width of [390, 1440])
        for (const theme of ["light", "dark"])
            for (const shape of ["underline", "strike", "highlight", "circle"]) {
                const name = (t) => join(out, "png", `${t}-${engine}-rest-${width}-${theme}-${shape}.png`);
                if (!existsSync(name("green")) || !existsSync(name("red"))) {
                    rows.push({ engine, width, theme, shape, pass: false, missing: true });
                    continue;
                }
                const a = PNG.sync.read(readFileSync(name("green")));
                const b = PNG.sync.read(readFileSync(name("red")));
                const same = a.width === b.width && a.height === b.height;
                let n = 0, max = 0;
                if (same)
                    for (let i = 0; i < a.data.length; i += 4) {
                        const d = Math.max(...[0, 1, 2].map((k) => Math.abs(a.data[i + k] - b.data[i + k])));
                        max = Math.max(max, d);
                        if (d > 48) n++;
                    }
                const frac = same ? n / (a.width * a.height) : 1;
                rows.push({ engine, width, theme, shape, size: [a.width, a.height], sameSize: same, differing: n, fraction: +frac.toFixed(5), maxDelta: max, pass: same && frac <= 0.005 });
            }
writeFileSync(join(out, "compare.json"), JSON.stringify(rows, null, 2));
for (const r of rows) console.log(`${r.pass ? "hold" : "MISS"} ${r.engine} ${r.width} ${r.theme} ${r.shape} differing=${r.differing} frac=${r.fraction} max=${r.maxDelta}`);
const miss = rows.filter((r) => !r.pass).length;
console.log(`${rows.length - miss}/${rows.length} hold`);
process.exit(miss ? 1 : 0);
