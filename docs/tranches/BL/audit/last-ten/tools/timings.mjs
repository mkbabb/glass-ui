// timings.mjs: builds ../TIMINGS.tsv from the motion, drag and shell logs. Each animated
// interaction: its kind, the measured motion (first to last changed frame, 1440 Chromium),
// the animations that ran with their computed duration and easing (named by token where
// the curve matches a token), and the frame budget at a 4x CPU throttle at 390 (and 360).
import { readFileSync, existsSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { LT, TREES } from "./lib.mjs";

const tokCss = readFileSync(join(TREES["11.1.0"].dir, "src/styles/tokens/scheme-spring.css"), "utf8");
const motionCss = readFileSync(join(TREES["11.1.0"].dir, "src/styles/tokens/scheme-motion.css"), "utf8");
const TOK = [];
for (const m of tokCss.matchAll(/--(spring-[a-z]+):\s*linear\(0,\s*([\d.]+)\s[\d.]+%,\s*([\d.]+)/g)) TOK.push({ name: m[1], a: +m[2], b: +m[3] });
const punch = motionCss.match(/--ease-cartoon-punch:\s*linear\(\s*0[^,]*,\s*(-?[\d.]+)/);
function easeName(e) {
    if (!e) return "";
    const m = e.match(/^linear\(0(?:\s0%)?,\s*(-?[\d.]+)\s[\d.]+%,\s*(-?[\d.]+)/);
    if (m) {
        const t = TOK.find((t) => Math.abs(t.a - +m[1]) < 2e-4 && Math.abs(t.b - +m[2]) < 2e-4);
        if (t) return "--" + t.name;
        if (+m[1] < 0) return "--ease-cartoon-punch";
        return "linear(...)";
    }
    const map = { "cubic-bezier(0.4, 0, 0.2, 1)": "standard (0.4,0,0.2,1)", "cubic-bezier(0, 0, 0.2, 1)": "--ease-out (0,0,0.2,1)", "cubic-bezier(0.16, 1, 0.3, 1)": "--ease-out-expo", "cubic-bezier(0.4, 0, 1, 1)": "--ease-in" };
    return map[e] || e;
}
const KIND = {
    select: "menu/popover", "dropdown-menu": "menu/popover", popover: "menu/popover", tooltip: "menu/popover",
    dialog: "modal/sheet", "sheet-side": "modal/sheet", "sheet-detents": "modal/sheet",
    accordion: "disclosure", collapsible: "disclosure",
    "dock-collapse": "dock", "dock-layer": "dock",
    "tabs-indicator": "small state", switch: "small state", pager: "small state",
    toast: "notification", carousel: "travel",
};
const load = (p) => (existsSync(join(LT, p)) ? JSON.parse(readFileSync(join(LT, p), "utf8")) : null);
const fine = load("logs/motion/11.1.0.chromium.fine.json");
const t390 = load("logs/motion/11.1.0.chromium.t4x390.json");
const t360 = load("logs/motion/11.1.0.chromium.t4x360.json");
const o2 = load("logs/motion/11.0.2.chromium.fine.json");
const by = (d, n) => d && d.results.find((r) => r.name === n);
const HEAD = ["kind", "component", "interaction", "animated element", "property / animation", "duration_ms", "delay_ms", "easing / token", "measured_motion_ms_1440", "4x390_dropped@60", "4x390_longest_ms", "4x390_pct>16.7", "4x390_pct>33", "4x360_dropped@60", "4x360_longest_ms", "11.0.2_measured_ms"];
const rows = [HEAD.join("\t")];
const fmt = (x) => (x == null ? "" : String(x));
const push = (o) => rows.push(HEAD.map((h) => fmt(o[h])).join("\t"));
const shortT = (t) => String(t || "").replace(/\[data-testid=[^\]]+\]/, "").split(".").slice(0, 3).join(".");
if (fine)
    for (const r of fine.results) {
        if (r.error || !r.fwd) continue;
        for (const dir of ["fwd", "back"]) {
            const ia = dir === "fwd" ? "open / forward" : "close / back";
            const a390 = by(t390, r.name)?.[dir]?.stats,
                a360 = by(t360, r.name)?.[dir]?.stats;
            const base = { kind: KIND[r.name] || "", component: r.name, interaction: ia, measured_motion_ms_1440: r[dir]?.ms, "4x390_dropped@60": a390?.dropped60, "4x390_longest_ms": a390?.longestMs, "4x390_pct>16.7": a390?.pctOver16, "4x390_pct>33": a390?.pctOver33, "4x360_dropped@60": a360?.dropped60, "4x360_longest_ms": a360?.longestMs, "11.0.2_measured_ms": by(o2, r.name)?.[dir]?.ms };
            const anims = (r.anims || []).filter((x) => r.backT == null || (dir === "fwd" ? x.t < r.backT : x.t >= r.backT));
            const seen = new Set();
            let n = 0;
            for (const x of anims) {
                const scroll = typeof x.duration !== "number";
                const key = shortT(x.target) + x.name + x.duration + x.easing;
                if (seen.has(key)) continue;
                seen.add(key);
                const ease = x.kfe && x.kfe !== "linear" && x.easing === "linear" ? x.kfe.split(",linear")[0] : x.easing;
                push({ ...base, "animated element": shortT(x.target), "property / animation": x.name + (x.kind === "CSSAnimation" ? " (keyframes)" : ""), duration_ms: scroll ? "scroll-timeline" : Math.round(x.duration), delay_ms: x.delay ? Math.round(x.delay) : 0, "easing / token": scroll ? "" : easeName(ease) });
                n++;
            }
            if (!n) push({ ...base, "animated element": "(script-driven, no CSS animation)", "property / animation": r.ch });
        }
    }
// drag and shell
for (const cs of ["t4x390"]) {
    const d = load(`logs/drag/11.1.0.chromium.${cs}.json`);
    if (d) {
        const so = d.results.sliderOOB, to = d.results.tabsOOB;
        if (so) push({ kind: "drag", component: "slider", interaction: "touch drag past the end and back", "animated element": "thumb", "property / animation": "left/translate per frame (script)", "4x390_dropped@60": so.stats.dropped60, "4x390_longest_ms": so.stats.longestMs, "4x390_pct>16.7": so.stats.pctOver16, "4x390_pct>33": so.stats.pctOver33 });
        if (to) push({ kind: "drag", component: "tabs-indicator", interaction: "touch drag past the strip, release outside", "animated element": "indicator", "property / animation": "translate (script spring)", "4x390_dropped@60": to.stats.dropped60, "4x390_longest_ms": to.stats.longestMs, "4x390_pct>16.7": to.stats.pctOver16, "4x390_pct>33": to.stats.pctOver33 });
    }
}
for (const [cs, label] of [["d1440", "1440"], ["t4x390", "4x390"]]) {
    const s = load(`logs/shell/11.1.0.chromium.${cs}.json`);
    if (!s) continue;
    const groups = {};
    for (const t of s.transitions) (groups[t.label] ||= []).push(t);
    for (const [k, ts] of Object.entries(groups)) {
        const longest = Math.max(...ts.map((t) => t.stats.longestMs || 0));
        const dropped = ts.map((t) => t.stats.dropped60 || 0);
        const vt = [...new Set(ts.flatMap((t) => t.vt))].slice(0, 3).join("; ");
        const med = [...dropped].sort((a, b) => a - b)[Math.floor(dropped.length / 2)];
        push({ kind: "page", component: "demo shell", interaction: `${k} (${ts.length} transitions, ${label})`, "animated element": "route content", "property / animation": vt || "no view-transition animation seen", "4x390_dropped@60": cs === "t4x390" ? `median ${med}, max ${Math.max(...dropped)}` : "", "4x390_longest_ms": cs === "t4x390" ? longest : "", measured_motion_ms_1440: cs === "d1440" ? `longest frame ${longest}` : "" });
    }
}
writeFileSync(join(LT, "TIMINGS.tsv"), rows.join("\n") + "\n");
console.log(rows.length - 1, "rows");
