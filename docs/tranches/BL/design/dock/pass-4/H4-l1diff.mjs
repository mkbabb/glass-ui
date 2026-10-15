// H4-l1diff.mjs: a RECORD beside L1 (H4-11), not a gate. L1's census counts declared lighting layers; this
// reads the paint: each build's L1 rest frames against floor v2's, pixel by pixel.
//   node H4-l1diff.mjs <out>      (reads <out>/runs/L1-<build>/frame-<engine>-<theme>-<state>.png)
import fs from "node:fs";
import path from "node:path";
const png = await import("/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js");
const PNG = png.PNG ?? png.default.PNG;
const O = process.argv[2];
console.log("| build | engine | theme | state | pixels differing by > 2/255 from floor v2 | max channel delta |\n|---|---|---|---|---|---:|");
for (const b of ["head", "bp", "g"]) for (const e of ["chromium", "webkit"]) for (const th of ["light", "dark"]) for (const st of ["collapsed", "expanded"]) {
    const f = (x) => path.join(O, "runs", `L1-${x}`, `frame-${e}-${th}-${st}.png`);
    const eng = e === "webkit" ? "Playwright WebKit" : "Chromium";
    try {
        const a = PNG.sync.read(fs.readFileSync(f(b))), r = PNG.sync.read(fs.readFileSync(f("fv2")));
        if (a.width !== r.width || a.height !== r.height) { console.log(`| ${b} | ${eng} | ${th} | ${st} | frame ${a.width}×${a.height} against ${r.width}×${r.height}: the rest extent differs, not compared | - |`); continue; }
        let n = 0, max = 0;
        for (let i = 0; i < a.data.length; i += 4) { const d = Math.max(Math.abs(a.data[i] - r.data[i]), Math.abs(a.data[i + 1] - r.data[i + 1]), Math.abs(a.data[i + 2] - r.data[i + 2])); if (d > 2) n++; if (d > max) max = d; }
        console.log(`| ${b} | ${eng} | ${th} | ${st} | ${n} of ${a.width * a.height} (${(100 * n / (a.width * a.height)).toFixed(2)} %) | ${max} |`);
    } catch (err) { console.log(`| ${b} | ${eng} | ${th} | ${st} | no frame | - |`); }
}
