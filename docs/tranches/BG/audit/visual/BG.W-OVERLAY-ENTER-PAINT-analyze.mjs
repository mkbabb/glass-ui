// Analyzer over the 12 (engine×mode×route) frame-series JSONs → per-series verdict + summary.
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "overlay-enter-paint");

const rows = [];
for (const f of readdirSync(OUT).filter((n) => n.endsWith(".frames.json"))) {
    const d = JSON.parse(readFileSync(join(OUT, f), "utf8"));
    const ef = d.enter?.frames || [];
    const xf = d.exit?.frames || [];
    // ENTER intermediate frames: 0.02 < opacity < 0.98
    const enterInter = ef.filter((r) => r.opacity > 0.02 && r.opacity < 0.98).length;
    const op0 = ef.length ? ef[0].opacity : null;
    const opN = ef.length ? ef[ef.length - 1].opacity : null;
    // scale bloom present? min scale < 0.97 somewhere (parse first component)
    const scNum = (s) => (s === "none" || s == null ? 1 : parseFloat(String(s).split(/\s+/)[0]));
    const minScale = ef.length ? Math.min(...ef.map((r) => scNum(r.scale))) : null;
    // blur present? max blur radius
    const blurNum = (s) => { const m = String(s || "").match(/blur\(([\d.]+)px\)/); return m ? parseFloat(m[1]) : 0; };
    const maxBlur = ef.length ? Math.max(...ef.map((r) => blurNum(r.filter))) : 0;
    // EXIT: closed-state painted frames; overshoot = any exit scale > 1.001
    const exitClosed = xf.filter((r) => (r.opacity != null)).length;
    const exitOvershoot = xf.some((r) => scNum(r.scale) > 1.02);
    // scrim: time (ms) to reach 80% of its settled effective alpha
    const scr = ef.filter((r) => r.scrimEffAlpha != null);
    const scrMax = scr.length ? Math.max(...scr.map((r) => r.scrimEffAlpha)) : null;
    let scrim80 = null;
    if (scrMax) { const target = 0.8 * scrMax; const hit = scr.find((r) => r.scrimEffAlpha >= target); scrim80 = hit ? hit.t : null; }
    const enterPass = enterInter >= 6 && (minScale != null && minScale < 0.97) && maxBlur > 1;
    const exitPass = exitClosed >= 4 && !exitOvershoot;
    rows.push({ f: f.replace(".frames.json", ""), engine: d.engine, mode: d.mode, route: d.route, enterFrames: ef.length, enterInter, minScale: minScale?.toFixed(3), maxBlur: maxBlur.toFixed(2), enterPass, exitFrames: xf.length, exitClosed, exitOvershoot, exitPass, scrim80, scrMax: scrMax?.toFixed(2), ss: d.startingStyleSupported });
}
rows.sort((a, b) => (a.engine + a.mode + a.route).localeCompare(b.engine + b.mode + b.route));
console.log("engine  mode  route    | enterF interF minScl maxBlur ENTER | exitF closedF over EXIT | scrim80ms scrMax ss");
for (const r of rows) {
    console.log(
        `${r.engine.padEnd(8)}${r.mode.padEnd(6)}${r.route.padEnd(9)}| ${String(r.enterFrames).padStart(5)} ${String(r.enterInter).padStart(5)} ${String(r.minScale).padStart(6)} ${String(r.maxBlur).padStart(6)} ${r.enterPass ? "PASS " : "FAIL "}| ${String(r.exitFrames).padStart(4)} ${String(r.exitClosed).padStart(6)} ${r.exitOvershoot ? "Y" : "n"}   ${r.exitPass ? "PASS " : "FAIL "}| ${String(r.scrim80).padStart(7)} ${String(r.scrMax).padStart(5)} ${r.ss}`,
    );
}
const enterAll = rows.every((r) => r.enterPass);
const exitAll = rows.every((r) => r.exitPass);
const exitFailRoutes = [...new Set(rows.filter((r) => !r.exitPass).map((r) => r.route))];
console.log(`\nENTER all-pass: ${enterAll}  |  EXIT all-pass: ${exitAll}  |  exit-fail routes: ${exitFailRoutes.join(", ") || "none"}`);
