#!/usr/bin/env node
// tables.mjs: markdown tables of the five items from record/items.json (run items.mjs first).
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const I = JSON.parse(readFileSync(join(HERE, "../record/items.json"), "utf8"));
const n = (v, d = 1) => (v == null || Number.isNaN(v) ? "–" : String(+(+v).toFixed(d)));
const name = (k) => {
    const [, scen, tree, engine, cell] = k.match(/^(.*?)\.(v11\.1\.0|wi8|live)\.(chromium|webkit)\.(.*)$/);
    const site = scen.replace(/-(fine|coarse)$/, "");
    const label = { fourier: "fourier.babb.dev", repro: "fourier repro", hand: "harness dock page", glass: /^1440/.test(cell) ? "glass.babb.dev sidebar" : "glass.babb.dev bottom dock", keyframes: "keyframes.babb.dev", color: "color.babb.dev", daraksha: "daraksha.babb.dev" }[site] || site;
    const where = tree === "live" ? label : `${label} ${tree}`;
    return { where, engine: engine === "chromium" ? "Chromium" : "WebKit", cell: cell.replace("-fine-", " ").replace("-coarse-", " touch ") };
};
const order = (a, b) => {
    const rank = (k) => ["fourier-", "repro-", "hand-", "glass-", "keyframes-", "color-", "daraksha-"].findIndex((p) => k.startsWith(p));
    const eng = (k) => (/\.webkit\./.test(k) ? 1 : 0);
    return rank(a) - rank(b) || eng(a) - eng(b) || a.localeCompare(b);
};
const keys = Object.keys(I).sort(order);
const mx = (a) => (a.length ? Math.max(...a.filter(Number.isFinite)) : null);
const row = (cells) => `| ${cells.join(" | ")} |`;

console.log("### Item 2: drift (px over one morph; the largest of every open or close in the cell)\n");
console.log(row(["where", "engine", "cell", "plate centre, open", "plate centre, close", "plate left / right edge travel", "seats' centres (open / close)", "the seal's centre (close / open)", "plate top", "the dock's layout width in the open / the close (frames that change it)"]));
console.log(row(Array(10).fill("---")));
for (const k of keys) {
    const r = I[k];
    if (r.openCentreRange == null && r.closeCentreRange == null) continue;
    const m = name(k);
    console.log(row([m.where, m.engine, m.cell, n(r.openCentreRange, 2), n(r.closeCentreRange, 2), `${n(r.openLeftRange)} / ${n(r.openRightRange)}`, `${n(r.openSeat0Drift)} / ${n(r.closeSeat0Drift)}`, `${n(r.closeSealDrift)} / ${n(r.openSealDrift)}`, n(r.topRange), [r.layoutOpen[0], r.layoutClose[0]].map((l) => (l ? `${n(l.from, 2)} → ${n(l.to, 2)} (${l.changes})` : "–")).join(" / ")]));
}

console.log("\n### Item 1: first and last frames (px of plate width per step, @ the frame interval in ms)\n");
console.log(row(["where", "engine", "cell", "open: 1st step, 2nd step", "open: run opacity in frame 1", "close: 1st step, 2nd step", "close: seal opacity in frame 1", "long frames in the first 3 (open / close)", "last step open / close (x the 3 before)", "duration open / close ms"]));
console.log(row(Array(10).fill("---")));
for (const k of keys) {
    const r = I[k];
    if (!r.openFirst.length && !r.closeFirst.length) continue;
    const m = name(k);
    const st = (a) => (a.length ? a.map((s) => `${n(s[0])}@${n(s[1])}, ${n(s[3])}@${n(s[4])}`).filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 4).join("; ") : "–");
    const ls = (a) => (a.length ? [...new Set(a.map((s) => `${n(s[0], 2)} (x${n(s[1])})${s[2] ? " against " + s[2].map((v) => n(v, 2)).join(",") : ""}`))].slice(0, 2).join("; ") : "–");
    const lf = (a) => {
        const all = a.flat();
        return all.length ? `${all.length}/${a.length} (${[...new Set(all.map((v) => n(v, 0)))].join(", ")} ms)` : `0/${a.length}`;
    };
    console.log(row([m.where, m.engine, m.cell, st(r.openFirst), `0 → ${n(r.openRunAppears, 2)}`, st(r.closeFirst), `0 → ${n(r.closeSealAppears, 2)}`, `${lf(r.openLongFirst3)} / ${lf(r.closeLongFirst3)}`, `${ls(r.openLast)} / ${ls(r.closeLast)}`, `${n(Math.min(...r.openDur), 0)}–${n(Math.max(...r.openDur), 0)} / ${n(Math.min(...r.closeDur), 0)}–${n(Math.max(...r.closeDur), 0)}`]));
}

console.log("\n### Item 4: the collapse's last frames (plate width in the last six frames of the motion, then the settle frame)\n");
console.log(row(["where", "engine", "cell", "last six plate widths (px)", "settle frame after the close began (ms)", "settle: plate x / w", "settle: the seal's centre (its opacity)", "settle: seats (run opacity)", "settle: the dock's layout width"]));
console.log(row(Array(9).fill("---")));
for (const k of keys) {
    const r = I[k];
    if (!r.closeTail.length) continue;
    const m = name(k);
    const tail = r.closeTail[0].lastSteps.map((v) => n(v, 2)).join(", ") + (r.closeTail[0].lastSeal?.some((v) => v != null) ? ` (seal centre ${r.closeTail[0].lastSeal.map((v) => n(v, 2)).join(", ")})` : "");
    const s = r.closeSettle[0];
    console.log(row([m.where, m.engine, m.cell, tail, s ? n(s.afterMs, 0) : "none (the motion's last frame is the settle)", s ? `${n(s.plateDx, 2)} / ${n(s.plateDw, 2)}` : "–", s ? `${n(s.sealDcx, 2)} (${n(s.sealOp, 2)})` : "–", s ? `${n(s.seat0Dx, 1)} (${n(s.runOp, 2)})` : "–", s && s.layout && s.layout.changes ? `${n(s.layout.from, 2)} → ${n(s.layout.to, 2)}` : "–"]));
}

console.log("\n### Item 3: the theme seat on hover and on press (px, against the frame before)\n");
console.log(row(["where", "engine", "cell", "hover in: seat x / y / w, glyph centre", "hover out", "press: every seat moves (frames, ms after the press)", "press: plate x / w", "press back"]));
console.log(row(Array(8).fill("---")));
for (const k of keys) {
    const r = I[k];
    if (!r.theme) continue;
    const m = name(k);
    const h = (route) => {
        const s = r.themeHover.find((x) => x.route === route);
        return s ? `${n(s.dx, 2)} / ${n(s.dy, 2)} / ${n(s.dw, 2)}, ${n(s.iconDcx, 2)}` : "0 (no frame changed)";
    };
    const p = r.themePress.find((x) => x.route === "theme-press");
    const b = r.themePress.find((x) => x.route === "theme-press-back");
    const pr = (s) => (s ? (s.dx > 0.5 ? `${n(s.dx, 1)} px in ${n(s.frames, 0)} frame(s), ${n(s.at, 0)} ms; stays ${n(s.endDx, 1)}` : `≤ ${n(Math.max(s.dx, s.dy, s.dw), 2)}`) : "0 (no frame changed)");
    console.log(row([m.where, m.engine, m.cell, r.routesOpen.length ? h("theme-hover-in") : "–", h("theme-hover-out"), pr(p), p ? `${n(p.plateDx, 2)} / ${n(p.plateDw, 2)}` : "0 / 0", pr(b)]));
}

console.log("\n### Item 5: tooltips seen (the visible box is reka's popper wrapper; the anchor seat is the seat nearest along the dock's axis)\n");
console.log(row(["where", "engine", "cell", "route", "tooltip box x, y, w, h", "anchor seat box", "anchor is the theme seat", "centre offset along the dock (px)", "gap (px)"]));
console.log(row(Array(9).fill("---")));
for (const k of keys) {
    const r = I[k];
    const m = name(k);
    for (const t of r.tooltips) {
        console.log(row([m.where, m.engine, m.cell, t.route, t.box.map((v) => n(v, 1)).join(", "), t.seat ? t.seat.map((v) => n(v, 1)).join(", ") : "–", t.seatIsTheme ? "yes" : "no", n(t.offset, 2), n(t.gap, 1)]));
    }
}
