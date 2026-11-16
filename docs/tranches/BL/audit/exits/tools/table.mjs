// table.mjs: prints the measured columns of TABLE.md (one row per surface per form) from
// logs/results. Chromium v11.0.2 is the base reading; WebKit, the 11.1.0 tip and reduced
// motion are folded in where they differ. Cause and cure are written by hand in TABLE.md.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { EX } from "./lib.mjs";
import { glassOf } from "./collate.mjs";
const R = (n) => { const p = join(EX, "logs/results", n + ".json"); return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")).surfaces : null; };
const cell = (v) => !v ? "" : v.verdict === "tween" ? `${Math.round(v.ms)}` : v.verdict === "CUT(teleport)" ? `CUT (moves ${Math.round(v.jump)} px in 1 frame, then ${Math.round(v.ms)} fade)` : v.verdict === "CUT(tail)" ? `CUT (removed at ${Math.round(v.tail * 100)} % painted, after ${Math.round(v.ms)})` : v.verdict.startsWith("CUT") ? "CUT" : v.verdict;
const out = [];
for (const form of ["phone", "desktop"]) {
    const base = R(`11.0.2.chromium.${form}.light.full`), wk = R(`11.0.2.webkit.${form}.light.full`), tip = R(`tip.chromium.${form}.light.full`), rm = R(`11.0.2.chromium.${form}.light.rm.first2`), dark = R(`11.0.2.chromium.${form}.dark.glass`), wkrm = R(`11.0.2.webkit.${form}.light.rm.first2`);
    for (const [id, s] of Object.entries(base)) {
        const routes = Object.entries(s.routes || {}).map(([k, v]) => {
            let t = `${k} ${cell(v)}`;
            const w = wk?.[id]?.routes?.[k];
            if (w && cell(w) !== cell(v) && !(w.verdict === "tween" && v.verdict === "tween")) t += ` [WK: ${cell(w)}]`;
            if (v.matFlip) t += " (material flips in 1 frame)";
            return t;
        }).join("; ");
        const tdiff = [];
        if (tip?.[id]) {
            const te = tip[id].enter;
            if (te && s.enter && te.verdict === "tween" && s.enter.verdict === "tween" && Math.abs(te.ms - s.enter.ms) > 40) tdiff.push(`enter ${Math.round(te.ms)}`);
            for (const [k, v] of Object.entries(tip[id].routes || {})) { const b = s.routes?.[k]; if (b && (cell(b) !== cell(v)) && (Math.abs((v.ms || 0) - (b.ms || 0)) > 25 || v.verdict !== b.verdict)) tdiff.push(`${k} ${cell(v)}`); }
        }
        const rmv = rm?.[id] ? `enter ${cell(rm[id].enter)}; ` + Object.entries(rm[id].routes || {}).map(([k, v]) => `${k} ${cell(v)}`).join("; ") : "";
        const wkrmv = wkrm?.[id] ? " [WK: " + Object.entries(wkrm[id].routes || {}).map(([k, v]) => `${k} ${cell(v)}`).join("; ") + "]" : "";
        out.push({ id, form, enter: cell(s.enter), enterWhat: (s.enter?.what || []).join(","), routes, rev: s.reverse?.verdict || "", glass: glassOf(s.glass), glassDark: dark?.[id] ? glassOf(dark[id].glass) : "", glassWk: wk?.[id] ? glassOf(wk[id].glass) : "", rm: rmv + wkrmv, tip: tdiff.join("; ") });
    }
}
console.log(JSON.stringify(out, null, 1));
