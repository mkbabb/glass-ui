// gen.mjs: writes the scenario files (scenarios/*.json) for the W-I.8 prototype gates.
// Every scenario names its cell in the url (?c=dock-wi8&cell=...), and a dark variant
// carries &scheme=dark in the url (the probe adds it only to url-less scenarios).
import { writeFileSync } from "node:fs";
const OUT = new URL("./scenarios/", import.meta.url);
const CELLS = {
    fine: { tag: "1440-fine-light", w: 1440, h: 900, pointer: "fine", scheme: "light" },
    dark: { tag: "1440-fine-dark", w: 1440, h: 900, pointer: "fine", scheme: "dark" },
    coarse: { tag: "390-coarse-light", w: 390, h: 844, pointer: "coarse", scheme: "light" },
    rm: { tag: "1440-fine-light-rm", w: 1440, h: 900, pointer: "fine", scheme: "light", reducedMotion: true },
    fine390: { tag: "390-fine-light", w: 390, h: 844, pointer: "fine", scheme: "light" },
};
const T = (id) => `[data-testid=${id}]`;
function track(id) {
    const d = T(id);
    return [
        { as: "dock", sel: d, attrs: ["class", "data-morphing"], props: ["--dock-expand-t", "--dock-morph-t"], colors: ["box-shadow"] },
        { as: "plate", sel: `${d} .dock-plate`, colors: ["box-shadow", "background-color"], styles: ["clip-path"] },
        { as: "seatplate", sel: `${d} .dock-plate--beside` },
        { as: "neck", sel: `${d} .dock-neck` },
        { as: "shadow", sel: `${d} .dock-shadow`, colors: ["box-shadow"] },
        { as: "persistent", sel: `${d} > .dock-controls > .dock-persistent:not(.dock-persistent-end)`, chain: true, styles: ["clip-path"] },
        { as: "pend", sel: `${d} > .dock-controls > .dock-persistent-end`, chain: true, styles: ["clip-path"] },
        { as: "layers", sel: `${d} .dock-layers`, chain: true, styles: ["clip-path"] },
        { as: "beside", sel: `${d} .dock-beside`, chain: true, styles: ["clip-path"] },
        { as: "full", sel: `${d} .dock-layer--full`, chain: true },
        { as: "summary", sel: `${d} .dock-layer--summary`, chain: true },
        { as: "seat", sel: `${d} .dock-layer--full > [data-glass-dock-seat], ${d} .dock-layer--full > * > [data-glass-dock-seat]`, all: true, chain: true },
    ];
}
const ESC = (id) => ({ do: "eval", js: `document.querySelector('${T(id)} .dock-run').dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))` });
const write = (s) => writeFileSync(new URL(`${s.name}.json`, OUT), JSON.stringify(s, null, 1));
const url = (cell, scheme, extra = "") => `/?c=dock-wi8&cell=${cell}${scheme === "dark" ? "&scheme=dark" : ""}${extra}`;
function base(name, cell, cellKey, extra = "") {
    const c = CELLS[cellKey];
    return { name, url: url(cell, c.scheme, extra), cells: [c], ready: T(cell), warmMs: 600, track: track(cell), cropAs: ["dock", "plate", "seatplate", "beside"], cropPad: 24, gapMs: 250 };
}
const pfx = { fine: "", dark: "", coarse: "", rm: "", fine390: "" };
// G-2: unfold then fold. Fine: the pointer enters (intent counts from its movement) and a
// press outside folds. Coarse: a tap on the folded face, then a tap outside.
for (const cell of ["w-pill", "w-std", "w-layers", "w-wide", "w-figure", "w-rounded", "w-outlet", "w-flow"]) {
    for (const ck of ["fine", "dark", "coarse", "rm"]) {
        for (const neck of cell === "w-std" ? ["a", "b"] : ["a"]) {
            const s = base(`fold-${cell}${cell === "w-std" ? "-neck" + neck : ""}-${ck}`, cell, ck, cell === "w-std" ? `&neck=${neck}` : "");
            const target = cell === "w-std" ? { sel: `${T(cell)} .dock-layer--summary` } : { sel: `${T(cell)}` };
            s.steps =
                ck === "coarse"
                    ? [{ do: "mark", name: "tap" }, { do: "click", sel: `${T(cell)} .dock-layer--summary` }, { do: "settle", quietMs: 400, maxMs: 3000 }, { do: "mark", name: "outside" }, { do: "click", sel: "[data-testid=anim-root]", at: [0.005, 0.005] }, { do: "settle", quietMs: 400, maxMs: 3000 }]
                    : [{ do: "leave", to: [8, 8] }, { do: "mark", name: "enter" }, { do: "hover", ...target, ms: 120, hz: 60 }, { do: "settle", quietMs: 400, maxMs: 3000 }, { do: "mark", name: "outside" }, { do: "click", sel: "[data-testid=anim-root]", at: [0.005, 0.005] }, { do: "settle", quietMs: 400, maxMs: 3000 }];
            s.strips = [];
            write(s);
        }
    }
}
// G-3: reversals on the pill. Unfold by keyboard (Tab to the folded face), reversed at f by
// Escape in the run; fold by Escape, reversed at f by the pointer returning.
for (const cell of ["w-pill", "w-std"]) {
    for (const f of [0.3, 0.5, 0.8]) {
        const pct = Math.round(f * 100);
        const sU = base(`rev-unfold-${cell}-${pct}`, cell, "fine");
        sU.steps = [
            { do: "leave", to: [8, 8] },
            { do: "mark", name: "enter" },
            { do: "hover", sel: T(cell), ms: 100, hz: 60 },
            { do: "waitFraction", as: "plate", ch: "w", to: cell === "w-std" ? 485 : 300, fraction: f, maxMs: 2000 },
            { do: "mark", name: `reverse-${pct}` },
            ESC(cell),
            { do: "leave", to: [8, 8] },
            { do: "settle", quietMs: 500, maxMs: 4000 },
        ];
        write(sU);
        const sF = base(`rev-fold-${cell}-${pct}`, cell, "fine");
        sF.steps = [
            { do: "leave", to: [8, 8] },
            { do: "hover", sel: T(cell), ms: 100, hz: 60 },
            { do: "settle", quietMs: 400, maxMs: 3000 },
            { do: "leave", to: [8, 800] },
            { do: "mark", name: "fold" },
            ESC(cell),
            { do: "waitFraction", as: "plate", ch: "w", to: 56, fraction: f, maxMs: 2000 },
            { do: "mark", name: `reverse-${pct}` },
            { do: "hover", sel: T(cell), ms: 16, hz: 60 },
            { do: "settle", quietMs: 500, maxMs: 4000 },
        ];
        write(sF);
    }
}
// G-4: layer swaps. The crossfade through faces of 2, 4, 1 and 3 rows, a third change 90 ms
// after the second; the switcher by key.
for (const ck of ["fine", "dark", "coarse", "rm"]) {
    const s = base(`swap-xf-${ck}`, "w-xf", ck);
    s.steps = [
        { do: "mark", name: "to4" }, { do: "click", sel: T("w-xf-layers") }, { do: "settle", quietMs: 400, maxMs: 3000 },
        { do: "mark", name: "to1" }, { do: "click", sel: T("w-xf-type") }, { do: "settle", quietMs: 400, maxMs: 3000 },
        { do: "mark", name: "to3" }, { do: "click", sel: T("w-xf-media") }, { do: "wait", ms: 90 },
        { do: "mark", name: "third" }, { do: "click", sel: T("w-xf-assets") }, { do: "settle", quietMs: 500, maxMs: 3000 },
    ];
    s.track.push({ as: "face", sel: `${T("w-xf")} .dock-face`, all: true, chain: true });
    write(s);
    const k = base(`swap-layers-${ck}`, "w-layers", ck);
    k.steps = [
        { do: "leave", to: [8, 8] },
        ck === "coarse" ? { do: "click", sel: `${T("w-layers")} .dock-layer--summary` } : { do: "hover", sel: T("w-layers"), ms: 100, hz: 60 },
        { do: "settle", quietMs: 400, maxMs: 3000 },
        { do: "focus", sel: `${T("w-layers")} [role=tab][aria-selected=true], ${T("w-layers")} .dock-switcher button` },
        { do: "mark", name: "key1" }, { do: "key", key: "ArrowDown" }, { do: "settle", quietMs: 400, maxMs: 3000 },
        { do: "mark", name: "key2" }, { do: "key", key: "ArrowDown" }, { do: "wait", ms: 90 },
        { do: "mark", name: "third" }, { do: "key", key: "ArrowUp" }, { do: "settle", quietMs: 500, maxMs: 3000 },
    ];
    k.track.push({ as: "face", sel: `${T("w-layers")} .dock-face`, all: true, chain: true });
    write(k);
}
// G-6: the labelled seat's hover in and out, and the 0 px guard (every seat in turn).
for (const ck of ["fine", "dark", "fine390"]) {
    for (const lab of ["a", "b"]) {
        const s = base(`label-${lab}-${ck}`, "w-std", ck, `&label=${lab}`);
        s.steps = [
            { do: "leave", to: [8, 8] },
            { do: "hover", sel: `${T("w-std")} .dock-layer--summary`, ms: 100, hz: 60 },
            { do: "settle", quietMs: 400, maxMs: 3000 },
            ...["read", "search", "library", "marks", "settings"].flatMap((id) => [
                { do: "mark", name: `in-${id}` },
                { do: "hover", sel: T(`w-std-${id}`), ms: 120, hz: 60 },
                { do: "wait", ms: 500 },
            ]),
            { do: "mark", name: "out" },
            { do: "move", to: { sel: T("w-std-home") }, ms: 120, hz: 60 },
            { do: "wait", ms: 600 },
        ];
        s.track.push({ as: "label", sel: `${T("w-std")} .dock-seat-label`, all: true, styles: ["scale", "translate"] });
        write(s);
    }
}
{
    const s = base("sweep-fine", "w-std", "fine");
    s.steps = [
        { do: "leave", to: [8, 8] },
        { do: "hover", sel: `${T("w-std")} .dock-layer--summary`, ms: 100, hz: 60 },
        { do: "settle", quietMs: 400, maxMs: 3000 },
        { do: "move", to: { sel: T("w-std-home") }, ms: 200, hz: 60 },
        { do: "mark", name: "sweep" },
        { do: "move", to: { sel: T("w-std-settings") }, ms: 12000, hz: 60 },
        { do: "wait", ms: 400 },
    ];
    s.strips = [];
    s.track.push({ as: "label", sel: `${T("w-std")} .dock-seat-label`, all: true });
    write(s);
}
// G-8: an overlay from a contributed seat closes with the fold.
for (const ck of ["fine", "dark"]) {
    const s = base(`overlay-${ck}`, "w-outlet", ck);
    s.steps = [
        { do: "leave", to: [8, 8] },
        { do: "hover", sel: `${T("w-outlet")} .dock-layer--summary`, ms: 100, hz: 60 },
        { do: "settle", quietMs: 400, maxMs: 3000 },
        { do: "click", sel: T("w-outlet-options") },
        { do: "settle", quietMs: 400, maxMs: 3000 },
        { do: "mark", name: "outside" },
        { do: "click", sel: "[data-testid=anim-root]", at: [0.005, 0.005] },
        { do: "settle", quietMs: 500, maxMs: 4000 },
    ];
    s.track.push({ as: "pop", sel: "[data-testid=w-outlet-pop]", chain: true });
    s.cropAs = ["dock", "plate", "pop"];
    write(s);
}
console.log("ok");
