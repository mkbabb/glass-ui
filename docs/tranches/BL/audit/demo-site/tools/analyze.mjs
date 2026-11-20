// Fold rows/<cell>.jsonl into per-route aggregates (rows/summary.json) and print tables.
// usage: node analyze.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROWS = path.join(HERE, "../rows");
const load = (c) => {
    const f = path.join(ROWS, `${c}.jsonl`);
    if (!fs.existsSync(f)) return { meta: null, rows: [] };
    const L = fs.readFileSync(f, "utf8").trim().split("\n").filter(Boolean).map(JSON.parse);
    return { meta: L[0], rows: L.slice(1) };
};
const cells = Object.fromEntries(["d1440", "l1440", "m390"].map((c) => [c, load(c)]));
const routes = [...new Set(Object.values(cells).flatMap((c) => c.rows.map((r) => r.route)))];
const byCell = (c, route) => cells[c].rows.find((r) => r.route === route);

const lowRuns = (row) => {
    if (!row) return [];
    const m = new Map();
    for (const s of row.steps) for (const t of s.texts) {
        const thr = t.large ? 3 : 4.5;
        if (t.cr >= thr) continue;
        const k = t.path + "|" + t.text;
        const prev = m.get(k);
        if (!prev || t.cr < prev.cr) m.set(k, { ...t, thr });
    }
    return [...m.values()].sort((a, b) => a.cr - b.cr);
};
const radiusFaults = (docks) => (docks || []).filter((d) => d.plate && d.plate.w > 0 && d.plate.h > 0 && !d.plate.eff.every((e) => e >= Math.min(d.plate.w, d.plate.h) / 2 - 1.5)).map((d) => ({ ...d, need: +(Math.min(d.plate.w, d.plate.h) / 2).toFixed(1) }));
const sum = {};
for (const route of routes) {
    const d = byCell("d1440", route), l = byCell("l1440", route), m = byCell("m390", route);
    const a = d && d.steps[0] && d.steps[0].anatomy;
    const am = m && m.steps[0] && m.steps[0].anatomy;
    const ctxKinds = (an) => an ? an.ctx.reduce((o, c) => { o[c.t] = (o[c.t] || 0) + 1; return o; }, {}) : {};
    const lowD = lowRuns(d), lowL = lowRuns(l), lowM = lowRuns(m);
    const hdr = (row) => row ? row.steps.map((s) => s.headerOverlap).filter(Boolean) : [];
    const ovl = (row) => row ? row.steps.flatMap((s) => s.overlaps) : [];
    const dockF = [];
    for (const [c, row] of [["d1440", d], ["l1440", l], ["m390", m]]) {
        if (!row) continue;
        for (const k of radiusFaults(row.docksRest)) dockF.push({ cell: c, posture: "rest", state: k.state, path: k.path, testid: k.testid, need: k.need, eff: k.plate.eff, raw: k.plate.raw, w: k.plate.w, h: k.plate.h, anim: k.plateAnim, cls: k.cls });
        for (const k of radiusFaults(row.docksOpen)) dockF.push({ cell: c, posture: "hover-open", state: k.state, path: k.path, testid: k.testid, need: k.need, eff: k.plate.eff, raw: k.plate.raw, w: k.plate.w, h: k.plate.h, anim: k.plateAnim, cls: k.cls });
    }
    sum[route] = {
        route,
        status: d && d.status, finalUrl: d && d.finalUrl, fail: [d, l, m].filter((x) => x && x.fail).map((x) => x.cell + ":" + x.fail),
        words: a ? a.words : null, wordsBeforeFirst: a ? a.wordsBeforeFirst : null, firstComp: a ? a.firstComp : null,
        compShare: a ? a.compShare : null, proseShare: a ? a.proseShare : null,
        compShare390: am ? am.compShare : null, proseShare390: am ? am.proseShare : null, wordsBeforeFirst390: am ? am.wordsBeforeFirst : null,
        pageScreens: a ? +(a.mainScrollH / a.mainClientH).toFixed(1) : null,
        libRoots: a ? a.libRoots : null,
        dupHeadings: a ? a.dupHeadings : [], dupParas: a ? a.dupParas : [],
        canvases: a ? a.canvases.length : null, canvasesMain: a ? a.canvases.filter((c) => c.inMain).length : null,
        canvasDetail: a ? a.canvases.map((c) => ({ cls: c.cls.slice(0, 40), inMain: c.inMain, rect: c.rect, st: c.st })) : [],
        ctx: ctxKinds(a), ctx390: ctxKinds(am),
        low: { d1440: lowD.length, l1440: lowL.length, m390: lowM.length },
        lowDetail: { d1440: lowD.slice(0, 40), l1440: lowL.slice(0, 40), m390: lowM.slice(0, 20) },
        header: { d1440: hdr(d), m390: hdr(m) },
        textOverlaps: { d1440: ovl(d), l1440: ovl(l), m390: ovl(m) },
        dockFaults: dockF,
        docks: d ? d.docksRest.map((k) => ({ path: k.path.slice(-90), testid: k.testid, inMain: k.inMain, state: k.state, vertical: k.vertical, stadium: k.stadium, need: k.need, eff: k.plate && k.plate.eff, w: k.plate && k.plate.w, h: k.plate && k.plate.h, plateBg: k.plateBg, plateBackdrop: k.plateBackdrop, cls: k.cls })) : [],
        docksOpen: d && d.docksOpen ? d.docksOpen.map((k) => ({ path: k.path.slice(-90), state: k.state, stadium: k.stadium, need: k.need, eff: k.plate && k.plate.eff })) : [],
        docksL: l ? l.docksRest.map((k) => ({ testid: k.testid, inMain: k.inMain, plateBg: k.plateBg, plateBackdrop: k.plateBackdrop })) : [],
        configurators: { d1440: a ? a.configurators : [], m390: am ? am.configurators : [] },
        errors: [...new Set([d, l, m].flatMap((x) => (x ? x.errors : [])))],
        overflow390: am ? am.overflow : null,
    };
}
fs.writeFileSync(path.join(ROWS, "summary.json"), JSON.stringify({ meta: Object.fromEntries(Object.entries(cells).map(([k, v]) => [k, v.meta])), routes: sum }, null, 1));
console.log("routes", routes.length, "cells", Object.fromEntries(Object.entries(cells).map(([k, v]) => [k, v.rows.length])));
