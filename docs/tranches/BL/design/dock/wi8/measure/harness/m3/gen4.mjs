// gen4.mjs: the MEASURE-3 scenario set (scenarios-m3/*.json, lists/m3.txt). Every P3 scenario
// (scenarios-p3, the second fold's return-15 included) with two additions, and the cells of
// the five behaviours the second fold left unbuilt:
//   - every cell tracks the run's children ("kid", their own corners) so "inside the plate"
//     is read as rounded shapes, at rest and in travel (C2-6);
//   - the open-seat cells mark the second change ("retarget") so its two legs are judged apart;
//   - w-many (O-358: five tabs and two avatar seats) at 360 and 390 by touch and at 1440;
//     w-ctl6 (six controls) at 360 by touch; w-rim (the rim at 40 %) fine, dark, coarse, rm;
//     the seat set (a seat joining and leaving) at 390 by touch, with the joining seat tracked.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
const IN = new URL("../scenarios-p3/", import.meta.url);
const OUT = new URL("../scenarios-m3/", import.meta.url);
mkdirSync(OUT, { recursive: true });
const CELLS = {
    fine: { tag: "1440-fine-light", w: 1440, h: 900, pointer: "fine", scheme: "light" },
    dark: { tag: "1440-fine-dark", w: 1440, h: 900, pointer: "fine", scheme: "dark" },
    coarse: { tag: "390-coarse-light", w: 390, h: 844, pointer: "coarse", scheme: "light" },
    c360: { tag: "360-coarse-light", w: 360, h: 780, pointer: "coarse", scheme: "light" },
    rm: { tag: "1440-fine-light-rm", w: 1440, h: 900, pointer: "fine", scheme: "light", reducedMotion: true },
};
const T = (id) => `[data-testid=${id}]`;
const kid = (testid) => ({ as: "kid", sel: `${T(testid)} .dock-layer--full > *:not([data-dock-leaving])`, all: true, chain: true });
const names = [];
const write = (s) => { writeFileSync(new URL(`${s.name}.json`, OUT), JSON.stringify(s, null, 1)); names.push(s.name); };
for (const f of readdirSync(IN).filter((x) => x.endsWith(".json")).sort()) {
    const s = JSON.parse(readFileSync(new URL(f, IN), "utf8"));
    const testid = /\[data-testid=([^\]]+)\]/.exec(s.ready)?.[1];
    if (testid && !s.track.some((t) => t.as === "kid")) s.track.push(kid(testid));
    if (/^p3-seat-/.test(s.name)) {
        for (const x of s.steps) if (x.do === "settle") x.afterChange = false;
        const i = s.steps.findIndex((x) => x.do === "mark" && x.name === "twice");
        const j = s.steps.findIndex((x, k) => k > i && x.do === "wait");
        if (i >= 0 && j > 0 && !s.steps.some((x) => x.name === "retarget")) s.steps.splice(j + 1, 0, { do: "mark", name: "retarget" });
    }
    write(s);
}
const ESC = (id) => ({ do: "eval", js: `document.querySelector('${T(id)} .dock-run').dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))` });
const OUTSIDE = { do: "click", sel: "[data-testid=anim-root]", at: [0.005, 0.005] };
const SETTLE = (q = 400, m = 3000) => ({ do: "settle", quietMs: q, maxMs: m });
function base(name, cell, ck, testid = cell) {
    const c = CELLS[ck];
    const t = T(testid);
    return {
        name, url: `/?c=dock-wi8&cell=${cell}${c.scheme === "dark" ? "&scheme=dark" : ""}`, cells: [c], ready: t, warmMs: 600,
        track: [
            { as: "dock", sel: t, attrs: ["class", "data-morphing"], props: ["--dock-expand-t", "--dock-morph-t", "--dock-curve-inset"], colors: ["box-shadow"] },
            { as: "plate", sel: `${t} .dock-plate`, colors: ["box-shadow", "background-color"], styles: ["clip-path"] },
            { as: "layers", sel: `${t} .dock-layers`, chain: true, styles: ["clip-path"] },
            { as: "full", sel: `${t} .dock-layer--full`, chain: true, attrs: ["data-compact"] },
            { as: "summary", sel: `${t} .dock-layer--summary`, chain: true },
            { as: "seat", sel: `${t} .dock-layer--full > [data-glass-dock-seat]`, all: true, chain: true, styles: ["translate"] },
            kid(testid),
        ],
        cropAs: ["dock", "plate"], cropPad: 24, gapMs: 250, strips: [],
    };
}
const fold = (s, testid, ck) => {
    s.steps = ck === "coarse" || ck === "c360"
        ? [{ do: "mark", name: "tap" }, { do: "click", sel: `${T(testid)} .dock-layer--summary` }, SETTLE(), { do: "mark", name: "outside" }, OUTSIDE, SETTLE()]
        : [{ do: "leave", to: [8, 8] }, { do: "mark", name: "enter" }, { do: "hover", sel: T(testid), ms: 120, hz: 60 }, SETTLE(), { do: "mark", name: "outside" }, OUTSIDE, SETTLE()];
    return s;
};
for (const ck of ["fine", "coarse", "c360"]) write(fold(base(`p3-fold-many-${ck}`, "w-many", ck), "w-many", ck));
write(fold(base("p3-fold-ctl6-c360", "w-ctl6", "c360"), "w-ctl6", "c360"));
for (const ck of ["fine", "dark", "coarse", "rm"]) {
    const s = fold(base(`p3-fold-rim-${ck}`, "w-rim", ck), "w-rim", ck);
    s.track.push({ as: "rim", sel: T("w-rim-rim"), props: ["--scroll-progress-rim-fill"] });
    write(s);
}
// The open seat moving in a run that still scrolls when compact: O-358's dock at 360 by touch
// (the site dock at 390 is compact now and fits, so it no longer scrolls).
{
    const s = base("p3-seat-many-c360", "w-many", "c360");
    const ev = (id) => ({ do: "eval", js: `document.querySelector('[data-testid=w-many-${id}]').click()` });
    const SETTLE = (q = 400, m = 3000) => ({ do: "settle", quietMs: q, maxMs: m, afterChange: false });
    s.steps = [{ do: "click", sel: `${T("w-many")} .dock-layer--summary` }, SETTLE(),
        { do: "mark", name: "neighbour" }, ev("search"), SETTLE(),
        { do: "mark", name: "far" }, ev("settings"), SETTLE(),
        { do: "mark", name: "twice" }, ev("home"), { do: "wait", ms: 90 }, { do: "mark", name: "retarget" }, ev("library"), SETTLE(500, 3000)];
    write(s);
}
// The open seat moving in a run that scrolls even when compact: ten seats at 390 by touch.
{
    const s = base("p3-seat-long-coarse", "w-long", "coarse");
    const ev = (i) => ({ do: "eval", js: `document.querySelector('[data-testid=w-long-${i}]').click()` });
    const Q = { do: "settle", quietMs: 400, maxMs: 3000, afterChange: false };
    s.steps = [{ do: "click", sel: `${T("w-long")} .dock-layer--summary` }, SETTLE(),
        { do: "mark", name: "neighbour" }, ev(1), Q,
        { do: "mark", name: "far" }, ev(9), Q,
        { do: "mark", name: "twice" }, ev(0), { do: "wait", ms: 90 }, { do: "mark", name: "retarget" }, ev(3), { do: "settle", quietMs: 500, maxMs: 3000, afterChange: false }];
    write(s);
}
// The seat set at 390 by touch; the joining seat tracked by its own id in every seat-set cell.
for (const n of names.filter((x) => /^p3-seatset-/.test(x))) {
    const s = JSON.parse(readFileSync(new URL(`${n}.json`, OUT), "utf8"));
    s.track.push({ as: "extra", sel: T("w-seatset-extra"), chain: true });
    write(s);
}
{
    const s = base("p3-seatset-coarse", "w-seatset", "coarse");
    s.track.push({ as: "extra", sel: T("w-seatset-extra"), chain: true });
    s.steps = [{ do: "click", sel: `${T("w-seatset")} .dock-layer--summary` }, SETTLE(),
        { do: "mark", name: "add" }, { do: "eval", js: "document.querySelector('[data-testid=w-seatset-add]').click()" }, SETTLE(),
        { do: "mark", name: "remove" }, { do: "eval", js: "document.querySelector('[data-testid=w-seatset-add]').click()" }, SETTLE()];
    write(s);
}
void ESC;
const uniq = [...new Set(names)];
writeFileSync(new URL("../../lists/m3.txt", import.meta.url), uniq.map((n) => `proto ${n}`).join("\n") + "\n");
console.log(uniq.length, "scenarios");
