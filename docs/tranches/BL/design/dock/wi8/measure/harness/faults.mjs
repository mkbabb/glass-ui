#!/usr/bin/env node
// faults.mjs <rows.json> [--json out.json] [--strict] [--gap ms] [--only as1,as2]
//
// Reads a probe's rows and flags, by rule, the fault kinds the recorders' brief names,
// with frame numbers. Frame numbers are row indices (row.i), one per rendered frame.
// Nothing here judges design intent: a flagged reversal on a spring that is meant to
// overshoot is still printed, with the overshoot amount, for the reader to place.
//
// Rules (per numeric channel, per motion segment; a segment is a run of changed frames
// separated by >= --gap ms (default 250) of stillness):
//   FIRST-FRAME JUMP  the first moving step is larger than the mean of the next three
//                     by the factor (1.5; --strict uses 1.0, the brief's literal rule),
//                     or one step covers >= 90 % of the travel (LANDS WHOLE)
//   LAST-FRAME SNAP   the last moving step is larger than the one before it (and above
//                     the creep size), or covers >= 25 % of the travel
//   JUMP (mid-motion) a step inside a motion larger than 3 px (non-px: 10 % of the excursion)
//                     and 4x the median of the three steps either side
//   CREEP             more than 150 ms of sub-threshold movement (0.5 px; 1 % of travel
//                     for non-px channels) before rest
//   REVERSAL          a step against the net direction (above noise); the overshoot past
//                     the end value is printed
//   JITTER            two or more consecutive sign alternations of the step
//   DROPPED FRAMES    a gap over 25 ms between rows inside a segment, with any long task
//                     or long animation frame overlapping it
//   DISCRETE          a property whose string changes but cannot be interpolated (its
//                     number list changes length, e.g. clip-path path() -> inset())
//   APPEARS / CUT     an element appears already opaque, or disappears while visible
//   MISMATCH          for each analysis.groups pair, the 2 %-band start and end times differ
//                     by more than 2 frames (start) or 50 ms (end); a clocks table is always printed
//   INTERRUPTION      at each mark named in analysis.interrupts (or starting "reverse"), a
//                     step within 6 frames after it larger than 3x the median step before it
//   OUT AGAINST IN    analysis.inOut {in: segIndex, out: segIndex} (0-based): durations per
//                     element and whether the out is a cut (<= 1 frame); off unless named
//   DRAG              analysis.drag {as, ch, ptr: "x"|"y"}: per-frame lag (pointer minus
//                     element), steps against the pointer while held, release settle frames
import { readFileSync, writeFileSync } from "node:fs";

const argv = process.argv.slice(2);
const WITH_VALUE = new Set(["--json", "--gap", "--only"]);
let file = null;
for (let i = 0; i < argv.length; i++) {
    if (WITH_VALUE.has(argv[i])) i++;
    else if (!argv[i].startsWith("--") && !file) file = argv[i];
}
const flag = (k) => argv.includes(k);
const val = (k, d) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : d);
if (!file) {
    console.error("usage: faults.mjs <rows.json> [--json out.json] [--strict] [--gap ms] [--only as1,as2]");
    process.exit(2);
}
const D = JSON.parse(readFileSync(file, "utf8"));
const rows = D.rows;
const A = D.analysis || {};
const STRICT = flag("--strict");
const FIRST_FACTOR = STRICT ? 1.0 : 1.5;
const GAP = +val("--gap", A.gapMs ?? 250);
const ONLY = val("--only", null)?.split(",");

// ── colour normalisation ────────────────────────────────────────────────────
// Computed colours change format mid-transition (rgb() at rest, oklab() while a
// transition interpolates in oklab), so every colour function is rewritten to
// oklab(L a b A) before its numbers are read. L is 0..1; a and b are about ±0.4.
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
function linSrgbToOklab(r, g, b) {
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
function p3LinToSrgbLin(r, g, b) {
    return [1.2249401 * r - 0.2249404 * g + 0 * b, -0.0420569 * r + 1.0420571 * g + 0 * b, -0.0196376 * r - 0.0786361 * g + 1.0982735 * b];
}
function colorToOklab(fn, body) {
    const parts = body.replace(/[,/]/g, " ").trim().split(/\s+/);
    const num = (p, pctScale = 1) => (p === "none" ? 0 : p.endsWith("%") ? (parseFloat(p) / 100) * pctScale : parseFloat(p));
    let space = fn,
        args = parts;
    if (fn === "color") {
        space = parts[0];
        args = parts.slice(1);
    }
    const alpha = args[3] !== undefined ? num(args[3]) : 1;
    let lab;
    if (space === "rgb" || space === "rgba") lab = linSrgbToOklab(...args.slice(0, 3).map((p) => toLin(num(p, 255) / 255)));
    else if (space === "srgb") lab = linSrgbToOklab(...args.slice(0, 3).map((p) => toLin(num(p))));
    else if (space === "srgb-linear") lab = linSrgbToOklab(...args.slice(0, 3).map((p) => num(p)));
    else if (space === "display-p3") lab = linSrgbToOklab(...p3LinToSrgbLin(...args.slice(0, 3).map((p) => toLin(num(p)))));
    else if (space === "oklab") lab = [num(args[0]), num(args[1], 0.4), num(args[2], 0.4)];
    else if (space === "oklch") {
        const C = num(args[1], 0.4),
            H = (parseFloat(args[2]) * Math.PI) / 180 || 0;
        lab = [num(args[0]), C * Math.cos(H), C * Math.sin(H)];
    } else return null;
    return `oklab(${lab.map((x) => x.toFixed(5)).join(" ")} ${alpha.toFixed(4)})`;
}
const normColors = (s) =>
    typeof s === "string" ? s.replace(/\b(rgba?|oklab|oklch|color)\(([^()]*)\)/g, (m, fn, body) => colorToOklab(fn, body) ?? m) : s;

// ── channel extraction ──────────────────────────────────────────────────────
const nums = (s) => (typeof s === "string" ? (normColors(s).match(/-?\d*\.?\d+(?:e-?\d+)?/gi) || []).map(Number) : []);
function matrixParts(tf) {
    if (!tf || tf === "none") return { tx: 0, ty: 0, sx: 1, sy: 1, rot: 0 };
    const n = nums(tf);
    let a, b, c, d, e, f;
    if (tf.startsWith("matrix3d")) [a, b, c, d, e, f] = [n[0], n[1], n[4], n[5], n[12], n[13]];
    else [a, b, c, d, e, f] = n;
    return { tx: e, ty: f, sx: Math.hypot(a, b), sy: Math.hypot(c, d), rot: (Math.atan2(b, a) * 180) / Math.PI };
}
const kindOf = (ch) => {
    const k = ch.split(".").pop();
    if (/^(x|y|w|h|cx|cy|tx|ty|trX|trY|r\d|clip\d+)$/.test(k)) return "px";
    if (/^(rot|ro)$/.test(k)) return "deg";
    if (k.startsWith("c:")) return "color";
    return "unit";
};

function channelsOf(o) {
    const out = {};
    if (!o) return out;
    for (const k of ["x", "y", "w", "h"]) out[k] = o[k];
    out.cx = o.x + o.w / 2;
    out.cy = o.y + o.h / 2;
    out.op = parseFloat(o.op);
    if (o.eop !== undefined) out.eop = o.eop;
    out.vis = o.vis;
    const m = matrixParts(o.tf);
    Object.assign(out, m);
    const tr = o.tr && o.tr !== "none" ? nums(o.tr) : [0, 0];
    out.trX = tr[0] ?? 0;
    out.trY = tr[1] ?? 0;
    const sc = o.sc && o.sc !== "none" ? nums(o.sc) : [1, 1];
    out.scX = sc[0] ?? 1;
    out.scY = sc[1] ?? sc[0] ?? 1;
    out.ro = o.ro && o.ro !== "none" ? nums(o.ro).pop() ?? 0 : 0;
    const rad = (o.rad || "").split("|").map((s) => nums(s)[0] ?? 0);
    rad.forEach((v, i) => (out["r" + i] = v));
    for (const [k, v] of Object.entries(o)) {
        if (k.startsWith("c:") || k === "clip") out["$" + k] = v; // vector strings, resolved below
        else if (k.startsWith("p:") || k.startsWith("s:")) {
            const n = nums(v);
            if (n.length === 1 && /^-?[\d.]/.test(String(v).trim())) out[k] = n[0];
            else out["$" + k] = v;
        } else if (k.startsWith("a:")) out["$" + k] = v ?? "";
    }
    return out;
}

// Build series: key "as.channel" -> array over rows (NaN when absent)
const series = {};
const strings = {};
const presence = {};
const keys = new Set();
rows.forEach((r) => Object.keys(r.el).forEach((k) => keys.add(k)));
for (const k of keys) {
    if (ONLY && !ONLY.includes(k.split("#")[0])) continue;
    presence[k] = rows.map((r) => (r.el[k] ? 1 : 0));
    const per = rows.map((r) => channelsOf(r.el[k]));
    const chs = new Set();
    per.forEach((c) => Object.keys(c).forEach((x) => chs.add(x)));
    for (const ch of chs) {
        if (ch.startsWith("$")) {
            const strs = per.map((c) => c[ch]);
            const lens = new Set(strs.filter((s) => s != null).map((s) => nums(s).length));
            if (lens.size === 1 && [...lens][0] > 0 && !ch.startsWith("$a:")) {
                const n = [...lens][0];
                const base = ch.slice(1);
                for (let j = 0; j < n; j++)
                    series[`${k}.${base === "clip" ? "clip" + j : base + "/" + j}`] = strs.map((s) => (s == null ? NaN : nums(s)[j]));
            } else strings[`${k}.${ch.slice(1)}`] = strs;
        } else series[`${k}.${ch}`] = per.map((c) => (c[ch] === undefined ? NaN : c[ch]));
    }
}

// ── helpers ─────────────────────────────────────────────────────────────────
const T = rows.map((r) => r.now);
const dtMedian = (() => {
    const d = [];
    for (let i = 1; i < T.length; i++) d.push(T[i] - T[i - 1]);
    d.sort((a, b) => a - b);
    return d[Math.floor(d.length / 2)] || 16.7;
})();
const noiseOf = (ch, vals) => {
    const k = kindOf(ch);
    if (k === "px") return 0.05;
    if (k === "deg") return 0.05;
    if (k === "color") return 0.0005; // oklab units after normColors
    return 0.0005;
};
const median = (a) => {
    const s = a.filter(Number.isFinite).sort((x, y) => x - y);
    return s.length ? s[Math.floor(s.length / 2)] : 0;
};
const fmt = (v) => (Math.abs(v) >= 100 ? v.toFixed(1) : Math.abs(v) >= 1 ? v.toFixed(2) : v.toFixed(4));

// segments from the sampler's change flags
const segs = [];
{
    let cur = null;
    for (const r of rows) {
        if (!r.changed) continue;
        if (cur && r.now - cur.endT <= GAP) {
            cur.end = r.i;
            cur.endT = r.now;
        } else {
            cur = { start: r.i, end: r.i, startT: r.now, endT: r.now };
            segs.push(cur);
        }
    }
}

// Pointer-held windows (down -> up), in page ms.
const HELD = [];
{
    let down = null;
    for (const e of D.ptrLog || []) {
        if (e.type === "pointerdown") down = e.t;
        else if ((e.type === "pointerup" || e.type === "pointercancel") && down != null) {
            HELD.push([down, e.t]);
            down = null;
        }
    }
    if (down != null) HELD.push([down, Infinity]);
}

const faults = [];
const F = (kind, where, frames, detail) => faults.push({ kind, where, frames, detail });

// ── per-channel rules ───────────────────────────────────────────────────────
const clocks = [];
for (const [key, v] of Object.entries(series)) {
    const noise = noiseOf(key, v);
    const kind = kindOf(key);
    segs.forEach((s, si) => {
        const a = Math.max(0, s.start - 1),
            b = Math.min(rows.length - 1, s.end + 1);
        const idx = [];
        for (let i = a; i <= b; i++) if (Number.isFinite(v[i])) idx.push(i);
        if (idx.length < 2) return;
        const v0 = v[idx[0]],
            v1 = v[idx[idx.length - 1]];
        const travel = v1 - v0;
        const maxEx = Math.max(...idx.map((i) => Math.abs(v[i] - v0)));
        if (maxEx <= noise * 5) return; // not moving in this segment
        const steps = [];
        for (let j = 1; j < idx.length; j++) steps.push({ i: idx[j], d: v[idx[j]] - v[idx[j - 1]] });
        const moving = steps.filter((x) => Math.abs(x.d) > noise);
        if (!moving.length) return;
        const creepEps = kind === "px" ? 0.5 : Math.max(noise * 2, 0.01 * Math.abs(travel || maxEx));
        const where = `${key} seg${si + 1}`;
        const absT = Math.abs(travel);

        // clocks: 2 %-band start/end, half-way time
        if (absT > noise * 5) {
            const band = 0.02 * absT;
            const st = idx.find((i) => Math.abs(v[i] - v0) > band);
            let en = st;
            for (const i of idx) if (Math.abs(v[i] - v1) > band) en = i;
            const half = idx.find((i) => Math.abs(v[i] - v0) >= absT / 2);
            clocks.push({ key, seg: si + 1, from: v0, to: v1, startF: st, endF: en, startT: T[st], endT: T[en], halfT: half != null ? T[half] : null });
        }

        // FIRST-FRAME JUMP
        const f0 = steps.indexOf(moving[0]);
        const next = steps.slice(f0 + 1, f0 + 4).map((x) => Math.abs(x.d));
        const avgNext = next.length ? next.reduce((p, q) => p + q, 0) / next.length : 0;
        const d0 = Math.abs(moving[0].d);
        if (absT > noise * 10 && d0 >= 0.9 * absT)
            F("FIRST-FRAME JUMP (lands whole)", where, [moving[0].i], `one step of ${fmt(moving[0].d)} covers ${((d0 / absT) * 100).toFixed(0)} % of the travel ${fmt(v0)} -> ${fmt(v1)}`);
        else if (next.length && d0 > FIRST_FACTOR * avgNext && d0 > creepEps)
            F("FIRST-FRAME JUMP", where, [moving[0].i], `first step ${fmt(moving[0].d)} vs mean of next ${next.length} ${fmt(avgNext)} (x${(d0 / (avgNext || 1e-9)).toFixed(2)})`);

        // LAST-FRAME SNAP
        const last = moving[moving.length - 1];
        const li = steps.indexOf(last);
        const prev = li > 0 ? steps[li - 1] : null;
        const dl = Math.abs(last.d);
        if (moving.length > 1 && dl > creepEps && ((prev && dl > Math.abs(prev.d) * 1.0 + noise) || (absT > noise * 10 && dl >= 0.25 * absT)))
            F("LAST-FRAME SNAP", where, prev ? [prev.i, last.i] : [last.i], `last step ${fmt(last.d)}${prev ? ` after ${fmt(prev.d)}` : ""}${absT > 0 ? `; ${((dl / absT) * 100).toFixed(0)} % of travel` : ""}; lands at ${fmt(v1)}`);

        // CREEP
        // any run of consecutive sub-threshold moving steps (a snap may end it)
        {
            let run = [];
            const flush = () => {
                if (run.length > 1) {
                    const dur = T[run[run.length - 1].i] - T[run[0].i];
                    if (dur > 150) {
                        const ends = run[run.length - 1] === last ? "before rest" : "then a larger step";
                        F("CREEP", where, [run[0].i, run[run.length - 1].i], `${dur.toFixed(0)} ms of sub-${fmt(creepEps)} movement (${run.length} steps, ${fmt(run.reduce((s, x) => s + x.d, 0))} in all), ${ends}`);
                    }
                }
                run = [];
            };
            for (const x of moving) {
                if (Math.abs(x.d) <= creepEps && (!run.length || x.i - run[run.length - 1].i <= 3)) run.push(x);
                else {
                    flush();
                    if (Math.abs(x.d) <= creepEps) run.push(x);
                }
            }
            flush();
        }

        // JUMP (mid-motion): a step far larger than the steps around it (not the first or
        // last moving step, which the two rules above read)
        const held = [];
        for (let j = 1; j < moving.length - 1; j++) {
            const x = moving[j];
            const near = moving.slice(Math.max(0, j - 3), j).concat(moving.slice(j + 1, j + 4)).map((y) => Math.abs(y.d));
            const med = median(near);
            const floor = kind === "px" ? 3 : Math.max(noise * 20, 0.1 * Math.abs(maxEx));
            if (!(Math.abs(x.d) > floor && Math.abs(x.d) > 4 * med)) continue;
            // While the pointer is held, steps follow input events (60 Hz input on ~120 Hz
            // frames, value steps): summarise them per channel instead of one line each.
            if (HELD.some(([a, b]) => T[x.i] > a && T[x.i] <= b)) held.push(x);
            else F("JUMP (mid-motion)", where, [x.i], `one step of ${fmt(x.d)} against a median of ${fmt(med)} for the steps around it (${fmt(v[x.i] - x.d)} -> ${fmt(v[x.i])})`);
        }
        if (held.length)
            F("JUMP (while held)", where, held.slice(0, 12).map((x) => x.i), `${held.length} steps while the pointer was down, median ${fmt(median(held.map((x) => Math.abs(x.d))))} with stillness between (input cadence or value steps; read the drag table)`);

        // REVERSAL
        if (absT > noise * 5) {
            const dir = Math.sign(travel);
            const back = moving.filter((x) => Math.sign(x.d) === -dir && Math.abs(x.d) > noise * 2);
            if (back.length) {
                const over = Math.max(0, ...idx.map((i) => (v[i] - v1) * dir));
                F("REVERSAL", where, back.map((x) => x.i), `${back.length} step(s) against the net direction (max ${fmt(Math.max(...back.map((x) => Math.abs(x.d))))}); overshoot past the end ${fmt(over)} (${absT ? ((over / absT) * 100).toFixed(1) : "-"} % of travel)`);
            }
        }

        // JITTER
        const sig = moving.filter((x) => Math.abs(x.d) > Math.max(noise * 2, creepEps * 0.2));
        let run = [];
        const runs = [];
        for (let j = 1; j < sig.length; j++) {
            const alt = Math.sign(sig[j].d) !== Math.sign(sig[j - 1].d) && sig[j].i - sig[j - 1].i <= 2;
            if (alt) {
                if (!run.length) run.push(sig[j - 1].i);
                run.push(sig[j].i);
            } else {
                if (run.length >= 3) runs.push(run);
                run = [];
            }
        }
        if (run.length >= 3) runs.push(run);
        for (const r of runs) F("JITTER", where, r, `${r.length - 1} consecutive sign alternations`);
    });
}

// ── strings, presence ───────────────────────────────────────────────────────
for (const [key, s] of Object.entries(strings)) {
    if (key.includes(".a:")) {
        for (let i = 1; i < s.length; i++)
            if (s[i] !== s[i - 1]) F("ATTR", key, [rows[i].i], `${JSON.stringify(s[i - 1])} -> ${JSON.stringify(s[i])}`);
        continue;
    }
    for (let i = 1; i < s.length; i++)
        if (s[i] !== s[i - 1] && s[i] != null && s[i - 1] != null)
            F("DISCRETE", key, [rows[i].i], `${String(s[i - 1]).slice(0, 70)} -> ${String(s[i]).slice(0, 70)} (number list changes length: cannot tween)`);
}
for (const [key, p] of Object.entries(presence)) {
    const op = series[`${key}.eop`] || series[`${key}.op`];
    for (let i = 1; i < p.length; i++) {
        if (p[i] && !p[i - 1]) {
            const o = op ? op[i] : NaN;
            const sc = (series[`${key}.sx`]?.[i] ?? 1) * (series[`${key}.scX`]?.[i] ?? 1);
            const whole = o > 0.5 && sc > 0.9;
            F(whole ? "APPEARS (whole)" : "APPEARS", key, [rows[i].i], `mounted at opacity ${fmt(o)}, scale ${fmt(sc)}, ${fmt(series[`${key}.w`]?.[i] ?? NaN)} x ${fmt(series[`${key}.h`]?.[i] ?? NaN)} px`);
        }
        if (!p[i] && p[i - 1]) {
            const o = op ? op[i - 1] : NaN;
            F(o > 0.1 ? "CUT" : "REMOVED", key, [rows[i - 1].i, rows[i].i], `removed at opacity ${fmt(o)}`);
        }
    }
}

// ── dropped frames ──────────────────────────────────────────────────────────
for (let i = 1; i < rows.length; i++) {
    const gap = T[i] - T[i - 1];
    if (gap <= 25) continue;
    const inSeg = segs.some((s) => rows[i].i >= s.start && rows[i - 1].i <= s.end + 1);
    const lt = [...(D.long || []), ...(D.loaf || [])].filter((e) => e.start < T[i] && e.start + e.dur > T[i - 1]);
    F(inSeg ? "DROPPED FRAMES" : "DROPPED FRAMES (at rest)", "page", [rows[i - 1].i, rows[i].i], `${gap.toFixed(1)} ms between samples (median ${dtMedian.toFixed(1)})${lt.length ? "; overlapping: " + lt.map((e) => `${e.dur.toFixed(0)} ms ${e.name || "long-animation-frame"}${e.scripts && e.scripts[0] ? " " + e.scripts[0].src : ""}`).join(", ") : ""}`);
}

// ── layout in frames (when traced) ──────────────────────────────────────────
if (rows[0] && rows[0].lc) {
    for (const s of segs) {
        const fr = rows.filter((r) => r.i >= s.start && r.i <= s.end);
        const withL = fr.filter((r) => r.lc.layout > 0);
        if (withL.length)
            F("LAYOUT IN FRAMES", `seg ${s.start}-${s.end}`, withL.slice(0, 40).map((r) => r.i), `${withL.length}/${fr.length} frames lay out (${withL.reduce((a, r) => a + r.lc.layout, 0)} layouts, ${withL.reduce((a, r) => a + r.lc.layoutMs, 0).toFixed(1)} ms)`);
    }
}

// ── mismatch ────────────────────────────────────────────────────────────────
for (const [ka, kb] of A.groups || []) {
    for (const seg of segs.map((_, i) => i + 1)) {
        const ca = clocks.find((c) => c.key === ka && c.seg === seg),
            cb = clocks.find((c) => c.key === kb && c.seg === seg);
        if (!ca || !cb) continue;
        const ds = Math.abs(ca.startT - cb.startT),
            de = Math.abs(ca.endT - cb.endT);
        if (ds > 2 * dtMedian || de > 50)
            F("MISMATCH", `${ka} vs ${kb} seg${seg}`, [ca.startF, cb.startF, ca.endF, cb.endF], `start ${ca.startT.toFixed(0)} vs ${cb.startT.toFixed(0)} ms (${ds.toFixed(0)}), end ${ca.endT.toFixed(0)} vs ${cb.endT.toFixed(0)} ms (${de.toFixed(0)})`);
    }
}

// ── interruption ────────────────────────────────────────────────────────────
const interrupts = (D.marks || []).filter((m) => (A.interrupts || []).includes(m.name) || m.name.startsWith("reverse"));
for (const m of interrupts) {
    const at = rows.findIndex((r) => r.i >= m.frame);
    if (at < 0) continue;
    for (const [key, v] of Object.entries(series)) {
        const noise = noiseOf(key, v);
        const before = [];
        for (let i = Math.max(1, at - 4); i < at; i++) before.push(Math.abs(v[i] - v[i - 1]));
        const med = median(before);
        if (!(med > noise)) continue;
        for (let i = at; i < Math.min(rows.length, at + 6); i++) {
            const d = Math.abs(v[i] - v[i - 1]);
            if (d > 3 * med && d > (kindOf(key) === "px" ? 0.5 : noise * 10)) {
                F("INTERRUPTION (jump)", `${key} at ${m.name}`, [rows[i - 1].i, rows[i].i], `step ${fmt(v[i] - v[i - 1])} vs median ${fmt(med)} before the reversal`);
                break;
            }
        }
    }
}

// ── out against in ──────────────────────────────────────────────────────────
const inOut = [];
{
    const pick = (x) => (typeof x === "number" ? segs[x] : null);
    // Only when the scenario names which segments are the in and the out: the second
    // segment of a recording is often something else (a late one-frame change).
    const sIn = A.inOut ? pick(A.inOut.in) : null;
    const sOut = A.inOut ? pick(A.inOut.out) : null;
    if (sIn && sOut) {
        const ki = segs.indexOf(sIn) + 1,
            ko = segs.indexOf(sOut) + 1;
        const byEl = {};
        for (const c of clocks) {
            const el = c.key.split(".")[0];
            byEl[el] ??= {};
            if (c.seg === ki) byEl[el].in = Math.max(byEl[el].in || 0, c.endT - c.startT + dtMedian);
            if (c.seg === ko) byEl[el].out = Math.max(byEl[el].out || 0, c.endT - c.startT + dtMedian);
        }
        for (const [el, x] of Object.entries(byEl)) {
            if (x.in == null && x.out == null) continue;
            inOut.push({ el, inMs: x.in, outMs: x.out });
            if (x.in && (x.out == null || x.out <= dtMedian * 1.01))
                F("OUT AGAINST IN (cut)", el, [sOut.start], `in ${x.in?.toFixed(0)} ms, out ${x.out ? x.out.toFixed(0) + " ms (one frame)" : "no frames"}`);
            else if (x.in && x.out && (x.out / x.in > 1.6 || x.out / x.in < 0.4))
                F("OUT AGAINST IN", el, [sIn.start, sOut.start], `in ${x.in.toFixed(0)} ms, out ${x.out.toFixed(0)} ms (x${(x.out / x.in).toFixed(2)})`);
        }
    }
}

// ── drag ────────────────────────────────────────────────────────────────────
let drag = null;
if (A.drag && D.ptrLog && D.ptrLog.length) {
    const { as, ch = "cx", ptr = "x" } = A.drag;
    const ev = D.ptrLog;
    const down = ev.find((e) => e.type === "pointerdown");
    const up = [...ev].reverse().find((e) => e.type === "pointerup" || e.type === "pointercancel");
    const v = series[`${as}.${ch}`];
    if (down && v) {
        const lag = [];
        const against = [];
        let prevP = null,
            prevV = null;
        rows.forEach((r, i) => {
            if (!r.ptr || r.now < down.t || (up && r.now > up.t)) return;
            const p = r.ptr[ptr];
            const l = p - v[i];
            lag.push({ i: r.i, t: +r.now.toFixed(1), ptr: +p.toFixed(1), el: +v[i].toFixed(2), lag: +l.toFixed(2) });
            if (prevP != null) {
                const dp = p - prevP,
                    dv = v[i] - prevV;
                if (Math.abs(dp) > 0.5 && Math.abs(dv) > 0.2 && Math.sign(dp) !== Math.sign(dv)) against.push(r.i);
            }
            prevP = p;
            prevV = v[i];
        });
        // lag relative to the grip offset at the first held frame
        const grip = lag.length ? lag[0].lag : 0;
        lag.forEach((x) => (x.lagFromGrip = +(x.lag - grip).toFixed(2)));
        const absLag = lag.map((x) => Math.abs(x.lagFromGrip));
        let settle = null;
        if (up) {
            const after = rows.filter((r) => r.now >= up.t);
            const vi = (r) => v[rows.indexOf(r)];
            const moving = after.filter((r, k) => k > 0 && Math.abs(vi(r) - vi(after[k - 1])) > 0.05);
            if (moving.length) {
                const first = moving[0],
                    lastR = moving[moving.length - 1];
                settle = {
                    releaseT: +up.t.toFixed(1),
                    firstFrame: first.i,
                    lastFrame: lastR.i,
                    durationMs: +(lastR.now - up.t).toFixed(1),
                    from: +vi(after[0]).toFixed(2),
                    to: +vi(lastR).toFixed(2),
                    firstSteps: moving.slice(0, 6).map((r) => +(vi(r) - vi(rows[rows.indexOf(r) - 1])).toFixed(2)),
                    lastSteps: moving.slice(-6).map((r) => +(vi(r) - vi(rows[rows.indexOf(r) - 1])).toFixed(2)),
                };
            } else settle = { releaseT: +up.t.toFixed(1), note: "no movement after release" };
        }
        drag = {
            as,
            ch,
            ptr,
            gripOffset: grip,
            heldFrames: lag.length,
            lagFromGrip: { max: +Math.max(0, ...absLag).toFixed(2), median: +median(absLag).toFixed(2) },
            againstPointer: against,
            settle,
            perFrame: lag,
        };
        if (against.length) F("DRAG: against the pointer", `${as}.${ch}`, against, `${against.length} frame(s) where the element moved opposite to the pointer`);
        if (drag.lagFromGrip.max > 8) F("DRAG: lag", `${as}.${ch}`, lag.filter((x) => Math.abs(x.lagFromGrip) > 8).map((x) => x.i).slice(0, 30), `max ${drag.lagFromGrip.max} px behind the grip point, median ${drag.lagFromGrip.median}`);
    }
}

// ── report ──────────────────────────────────────────────────────────────────
const meta = D.meta || {};
const order = ["APPEARS (whole)", "CUT", "JUMP (mid-motion)", "DISCRETE", "JUMP (while held)", "FIRST-FRAME JUMP (lands whole)", "FIRST-FRAME JUMP", "LAST-FRAME SNAP", "INTERRUPTION (jump)", "OUT AGAINST IN (cut)", "OUT AGAINST IN", "MISMATCH", "REVERSAL", "JITTER", "CREEP", "DROPPED FRAMES", "LAYOUT IN FRAMES", "DRAG: against the pointer", "DRAG: lag"];
faults.sort((a, b) => {
    const ia = order.indexOf(a.kind),
        ib = order.indexOf(b.kind);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.frames[0] - b.frames[0];
});
const lines = [];
lines.push(`# ${meta.scenario} · ${meta.tree} (${(meta.sha || "").slice(0, 9)}) · ${meta.engine} · ${meta.cell?.tag} · hook ${meta.hook}`);
lines.push(`${rows.length} frames, median ${dtMedian.toFixed(1)} ms; segments: ${segs.map((s, i) => `seg${i + 1} f${s.start}-f${s.end} (${s.startT.toFixed(0)}-${s.endT.toFixed(0)} ms)`).join(", ") || "none"}`);
if (D.marks?.length) lines.push(`marks: ${D.marks.map((m) => `${m.name}@f${m.frame} ${m.t.toFixed(0)}ms`).join(", ")}`);
const kinds = {};
faults.forEach((f) => (kinds[f.kind] = (kinds[f.kind] || 0) + 1));
lines.push(`faults: ${Object.entries(kinds).map(([k, n]) => `${k} ${n}`).join(", ") || "none"}`);
lines.push("");
for (const f of faults.filter((f) => f.kind !== "ATTR")) lines.push(`${f.kind} | ${f.where} | frames ${f.frames.join(",")} | ${f.detail}`);
const attrs = faults.filter((f) => f.kind === "ATTR");
if (attrs.length) {
    lines.push("", "attribute changes (context, not faults):");
    for (const f of attrs) lines.push(`  ${f.where} f${f.frames[0]}: ${f.detail}`);
}
lines.push("", "clocks (2 %-band start and end per moving channel):");
for (const c of clocks.sort((a, b) => a.seg - b.seg || a.startT - b.startT))
    lines.push(`  seg${c.seg} ${c.key}: ${fmt(c.from)} -> ${fmt(c.to)}  start f${c.startF} ${c.startT?.toFixed(0)}ms  half ${c.halfT?.toFixed(0)}ms  end f${c.endF} ${c.endT?.toFixed(0)}ms  (${(c.endT - c.startT).toFixed(0)} ms)`);
if (inOut.length) {
    lines.push("", "out against in (ms per element):");
    for (const x of inOut) lines.push(`  ${x.el}: in ${x.inMs?.toFixed(0) ?? "-"}  out ${x.outMs?.toFixed(0) ?? "-"}`);
}
if (drag) {
    lines.push("", `drag ${drag.as}.${drag.ch} vs pointer ${drag.ptr}: ${drag.heldFrames} held frames, lag from grip max ${drag.lagFromGrip.max} px, median ${drag.lagFromGrip.median} px; against pointer: ${drag.againstPointer.join(",") || "none"}`);
    if (drag.settle) lines.push(`  release settle: ${JSON.stringify(drag.settle)}`);
}
if (D.anims?.length) {
    lines.push("", "animations seen (computed timing):");
    const seenK = new Set();
    for (const a of D.anims) {
        const k = `${a.target} ${a.name} ${a.duration} ${a.easing}`;
        if (seenK.has(k)) continue;
        seenK.add(k);
        lines.push(`  f${a.frame} ${a.kind} ${a.name} on ${a.target}: ${typeof a.duration === "number" ? a.duration.toFixed(0) : a.duration} ms, delay ${a.delay}, easing ${String(a.easing).slice(0, 60)}${a.keyframeEasings?.length && a.keyframeEasings.join() !== "linear" ? ", keyframe easings " + a.keyframeEasings.join(" ").slice(0, 80) : ""}`);
    }
}
console.log(lines.join("\n"));
const jsonOut = val("--json", null);
if (jsonOut) writeFileSync(jsonOut, JSON.stringify({ meta, segments: segs, faults, clocks, inOut, drag, dtMedian }, null, 1));
