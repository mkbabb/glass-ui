// gen3.mjs: the PROTOTYPE-3 scenario set (scenarios-p3/*.json): gen2's cells, renamed p3-, and the cells build step 7 names, the gates as W-I.8 states
// them after RULINGS-2. Each scenario names its cell in the url; the dark variant carries
// &scheme=dark. One build, both engines, 1440 fine light and dark, 390 coarse, reduced motion.
import { mkdirSync, writeFileSync } from "node:fs";
const OUT = new URL("./scenarios-p3/", import.meta.url);
mkdirSync(OUT, { recursive: true });
const CELLS = {
    fine: { tag: "1440-fine-light", w: 1440, h: 900, pointer: "fine", scheme: "light" },
    dark: { tag: "1440-fine-dark", w: 1440, h: 900, pointer: "fine", scheme: "dark" },
    coarse: { tag: "390-coarse-light", w: 390, h: 844, pointer: "coarse", scheme: "light" },
    rm: { tag: "1440-fine-light-rm", w: 1440, h: 900, pointer: "fine", scheme: "light", reducedMotion: true },
};
const T = (id) => `[data-testid=${id}]`;
function track(id) {
    const d = T(id);
    return [
        { as: "dock", sel: d, attrs: ["class", "data-morphing"], props: ["--dock-expand-t", "--dock-morph-t"], colors: ["box-shadow"] },
        { as: "plate", sel: `${d} .dock-plate`, colors: ["box-shadow", "background-color"], styles: ["clip-path"] },
        { as: "persistent", sel: `${d} > .dock-controls > .dock-persistent:not(.dock-persistent-end)`, chain: true, styles: ["clip-path"] },
        { as: "pend", sel: `${d} > .dock-controls > .dock-persistent-end`, chain: true, styles: ["clip-path"] },
        { as: "layers", sel: `${d} .dock-layers`, chain: true, styles: ["clip-path"] },
        { as: "full", sel: `${d} .dock-layer--full`, chain: true },
        { as: "summary", sel: `${d} .dock-layer--summary`, chain: true },
        { as: "seat", sel: `${d} .dock-layer--full > [data-glass-dock-seat], ${d} .dock-layer--full > * > [data-glass-dock-seat]`, all: true, chain: true, styles: ["translate"] },
    ];
}
const ESC = (id) => ({ do: "eval", js: `document.querySelector('${T(id)} .dock-run').dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))` });
const OUTSIDE = { do: "click", sel: "[data-testid=anim-root]", at: [0.005, 0.005] };
const SETTLE = (q = 400, m = 3000) => ({ do: "settle", quietMs: q, maxMs: m });
const write = (s) => writeFileSync(new URL(`${s.name}.json`, OUT), JSON.stringify(s, null, 1));
const url = (cell, scheme, extra = "") => `/?c=dock-wi8&cell=${cell}${scheme === "dark" ? "&scheme=dark" : ""}${extra}`;
function base(name, cell, ck, extra = "", testid = cell) {
    const c = CELLS[ck];
    return { name, url: url(cell, c.scheme, extra), cells: [c], ready: T(testid), warmMs: 600, track: track(testid), cropAs: ["dock", "plate"], cropPad: 24, gapMs: 250, strips: [] };
}
const names = [];
const add = (s) => ((s.name = s.name.replace(/^p2-/, "p3-")), write(s), names.push(s.name));

// G-2 (and G-10 under rm): unfold then fold, per cell. Fine: the pointer enters and a press
// outside folds. Coarse: a tap on the folded face, then a tap outside.
const G2 = [
    ["w-pill"], ["w-rounded"], ["w-layers"], ["w-wide"], ["w-outlet"], ["w-flow"], ["w-seat"],
    ["w-card"], ["w-vert"], ["w-rail"], ["w-transport"], ["w-sci"],
    ["w-ctl", "&corner=bottom-end&within=viewport", "w-ctl", "ctl-be"],
    ["w-ctl", "&corner=top-start&within=parent", "w-ctl", "ctl-ts-parent"],
    ["w-fourier"], ["w-daraksha", "", "w-daraksha"], ["w-ctlout"],
];
for (const [cell, extra = "", testid = cell, tag = cell.slice(2)] of G2) {
    for (const ck of ["fine", "dark", "coarse", "rm"]) {
        const s = base(`p2-fold-${tag}-${ck}`, cell, ck, extra, testid);
        // keyframes's transport has no #collapsed face: its folded face is the persistent Play.
        const tapSel = cell === "w-transport" ? `${T(testid)}` : `${T(testid)} .dock-layer--summary`;
        s.steps =
            ck === "coarse"
                ? [{ do: "mark", name: "tap" }, { do: "click", sel: tapSel }, SETTLE(), { do: "mark", name: "outside" }, OUTSIDE, SETTLE()]
                : [{ do: "leave", to: [8, 8] }, { do: "mark", name: "enter" }, { do: "hover", sel: T(testid), ms: 120, hz: 60 }, SETTLE(), { do: "mark", name: "outside" }, OUTSIDE, SETTLE()];
        if (cell === "w-scope") s.track.push({ as: "follower", sel: T("w-scope-follower") });
        add(s);
    }
}
// The controls dock with one seat: it never folds (both engines, fine and coarse).
for (const ck of ["fine", "coarse"]) {
    const s = base(`p2-ctl1-${ck}`, "w-ctl1", ck);
    s.steps = [{ do: "leave", to: [8, 8] }, { do: "hover", sel: T("w-ctl1"), ms: 120, hz: 60 }, SETTLE(), { do: "mark", name: "outside" }, OUTSIDE, SETTLE()];
    add(s);
}
// Opened by focus and folded by Escape; folded by the linger (pill, fine).
{
    const s = base("p2-fold-pill-focus-esc-fine", "w-pill", "fine");
    s.steps = [{ do: "leave", to: [8, 8] }, { do: "key", key: "Tab" }, SETTLE(), { do: "mark", name: "esc" }, { do: "key", key: "Escape" }, SETTLE()];
    add(s);
    const l = base("p2-fold-pill-linger-fine", "w-pill", "fine");
    l.steps = [{ do: "leave", to: [8, 8] }, { do: "hover", sel: T("w-pill"), ms: 120, hz: 60 }, SETTLE(), { do: "leave", to: [8, 800] }, { do: "mark", name: "linger" }, { do: "wait", ms: 6400 }, SETTLE(500, 3000)];
    add(l);
}
// A window resize, then an unfold: the unfold's first row equals the rest.
{
    const s = base("p2-resize-pill-fine", "w-pill", "fine");
    s.steps = [{ do: "leave", to: [8, 8] }, { do: "mark", name: "resize" }, { do: "viewport", w: 1200, h: 900 }, SETTLE(), { do: "mark", name: "enter" }, { do: "hover", sel: T("w-pill"), ms: 120, hz: 60 }, SETTLE()];
    add(s);
}
// A two-control dock, the slider held through the fold (Escape while the pointer is down).
{
    const s = base("p2-held-wide-fine", "w-wide", "fine");
    s.steps = [{ do: "leave", to: [8, 8] }, { do: "hover", sel: T("w-wide"), ms: 120, hz: 60 }, SETTLE(), { do: "down", sel: `${T("w-wide")} [role=slider]` }, { do: "move", to: { rel: [20, 0] }, ms: 120, hz: 60 }, { do: "mark", name: "fold" }, { do: "key", key: "Escape" }, SETTLE(400, 3000), { do: "up" }, SETTLE()];
    add(s);
}
// G-9: the follower under [data-dock-scope], an unfold and a fold.
for (const ck of ["fine"]) {
    const s = base(`p2-scope-${ck}`, "w-scope", ck);
    s.track.push({ as: "follower", sel: T("w-scope-follower") }, { as: "scopehost", sel: T("w-scope-host"), props: ["--dock-expand-t"] });
    s.steps = [{ do: "leave", to: [8, 8] }, { do: "hover", sel: T("w-scope"), ms: 120, hz: 60 }, SETTLE(), { do: "mark", name: "outside" }, OUTSIDE, SETTLE()];
    add(s);
}
// G-3: reversals on the pill at 25, 50 and 75 % of an unfold (by Escape, by a press outside)
// and of a fold (by the pointer returning to 8 % of the painted plate, by a press there).
for (const f of [0.25, 0.5, 0.75]) {
    const pct = Math.round(f * 100);
    for (const by of ["esc", "out"]) {
        const s = base(`p2-rev-unfold-${pct}-${by}`, "w-pill", "fine");
        s.steps = [
            { do: "leave", to: [8, 8] }, { do: "mark", name: "enter" }, { do: "hover", sel: T("w-pill"), ms: 100, hz: 60 },
            { do: "waitFraction", as: "plate", ch: "w", to: 208, fraction: f, maxMs: 2000 },
            { do: "mark", name: `reverse-${pct}` }, by === "esc" ? ESC("w-pill") : OUTSIDE, { do: "leave", to: [8, 8] }, SETTLE(500, 4000),
        ];
        add(s);
    }
    for (const by of ["ptr", "press"]) {
        const s = base(`p2-rev-fold-${pct}-${by}`, "w-pill", "fine");
        const back = { sel: `${T("w-pill")} .dock-plate`, at: [0.08, 0.5] };
        s.steps = [
            { do: "leave", to: [8, 8] }, { do: "hover", sel: T("w-pill"), ms: 100, hz: 60 }, SETTLE(), { do: "leave", to: [8, 800] },
            { do: "mark", name: "fold" }, ESC("w-pill"),
            { do: "waitFraction", as: "plate", ch: "w", to: 56, fraction: f, maxMs: 2000 },
            { do: "mark", name: `reverse-${pct}` },
            by === "ptr" ? { do: "hover", ...back, ms: 16, hz: 60 } : { do: "click", ...back },
            SETTLE(500, 4000),
        ];
        add(s);
    }
}
// G-4: layer swaps (crossfade, switcher by key), and the run's open seat moving.
for (const ck of ["fine", "dark", "coarse", "rm"]) {
    const s = base(`p2-swap-xf-${ck}`, "w-xf", ck);
    s.steps = [
        { do: "mark", name: "to4" }, { do: "click", sel: T("w-xf-layers") }, SETTLE(),
        { do: "mark", name: "to1" }, { do: "click", sel: T("w-xf-type") }, SETTLE(),
        { do: "mark", name: "to3" }, { do: "click", sel: T("w-xf-media") }, { do: "wait", ms: 90 },
        { do: "mark", name: "third" }, { do: "click", sel: T("w-xf-assets") }, SETTLE(500, 3000),
    ];
    s.track.push({ as: "face", sel: `${T("w-xf")} .dock-face`, all: true, chain: true, styles: ["translate"] });
    add(s);
    const k = base(`p2-swap-layers-${ck}`, "w-layers", ck);
    k.steps = [
        { do: "leave", to: [8, 8] },
        ck === "coarse" ? { do: "click", sel: `${T("w-layers")} .dock-layer--summary` } : { do: "hover", sel: T("w-layers"), ms: 100, hz: 60 },
        SETTLE(),
        { do: "focus", sel: `${T("w-layers")} [role=tab][aria-selected=true], ${T("w-layers")} .dock-switcher button` },
        { do: "mark", name: "key1" }, { do: "key", key: "ArrowDown" }, SETTLE(),
        { do: "mark", name: "key2" }, { do: "key", key: "ArrowDown" }, { do: "wait", ms: 90 },
        { do: "mark", name: "third" }, { do: "key", key: "ArrowUp" }, SETTLE(500, 3000),
    ];
    k.track.push({ as: "face", sel: `${T("w-layers")} .dock-face`, all: true, chain: true, styles: ["translate"] });
    add(k);
}
for (const ck of ["fine", "coarse", "rm"]) {
    const s = base(`p2-seat-${ck}`, "w-seat", ck);
    const open = ck === "coarse" ? { do: "click", sel: `${T("w-seat")} .dock-layer--summary` } : { do: "hover", sel: T("w-seat"), ms: 100, hz: 60 };
    s.steps = [
        { do: "leave", to: [8, 8] }, open, SETTLE(), { do: "pin", js: "" },
        { do: "mark", name: "neighbour" }, { do: "eval", js: "document.querySelector('[data-testid=w-seat-search]').click()" }, SETTLE(),
        { do: "mark", name: "far" }, { do: "eval", js: "document.querySelector('[data-testid=w-seat-marks]').click()" }, SETTLE(),
        { do: "mark", name: "twice" }, { do: "eval", js: "document.querySelector('[data-testid=w-seat-read]').click()" }, { do: "wait", ms: 90 },
        { do: "eval", js: "document.querySelector('[data-testid=w-seat-library]').click()" }, SETTLE(500, 3000),
    ].filter((x) => x.do !== "pin");
    add(s);
}
// G-6: the hover guard: each seat of each kind, then leave; a slow sweep across the run.
{
    const s = base("p2-hover-fine", "w-seat", "fine");
    s.steps = [
        { do: "leave", to: [8, 8] }, { do: "hover", sel: T("w-seat"), ms: 100, hz: 60 }, SETTLE(),
        ...["home", "read", "search", "library", "marks", "settings"].flatMap((id) => [{ do: "mark", name: `in-${id}` }, { do: "hover", sel: T(`w-seat-${id}`), ms: 120, hz: 60 }, { do: "wait", ms: 300 }]),
        { do: "mark", name: "sweep" }, { do: "move", to: { sel: T("w-seat-settings") }, ms: 0 }, { do: "move", to: { sel: T("w-seat-home") }, ms: 6000, hz: 60 }, { do: "wait", ms: 300 },
    ];
    add(s);
}
// G-8: an overlay opened from a contributed seat: a press outside, Escape twice, the linger.
for (const how of ["out", "esc", "linger"]) {
    const s = base(`p2-overlay-${how}`, "w-outlet", "fine");
    s.track.push({ as: "pop", sel: "[data-testid=w-outlet-pop]", chain: true });
    s.cropAs = ["dock", "plate", "pop"];
    const tail =
        how === "out" ? [{ do: "mark", name: "outside" }, OUTSIDE, SETTLE(500, 4000)]
        : how === "esc" ? [{ do: "mark", name: "esc1" }, { do: "key", key: "Escape" }, SETTLE(400, 2000), { do: "mark", name: "esc2" }, { do: "key", key: "Escape" }, SETTLE(500, 3000)]
        : [{ do: "leave", to: [8, 800] }, { do: "mark", name: "linger" }, { do: "wait", ms: 9000 }];
    s.steps = [{ do: "leave", to: [8, 8] }, { do: "hover", sel: `${T("w-outlet")} .dock-layer--summary`, ms: 100, hz: 60 }, SETTLE(), { do: "click", sel: T("w-outlet-options") }, SETTLE(), ...tail];
    add(s);
}
// ── PROTOTYPE-3: the cells never built ──
// G-2: the controls dock's other two corners; a scrolling run scrolled to its middle, then
// folded; the two-dock page; value.js's swap and keyframes's code pane (consumer cells).
for (const [cell, extra, tag] of [["w-ctl", "&corner=bottom-start&within=viewport", "ctl-bs"], ["w-ctl", "&corner=top-end&within=parent", "ctl-te-parent"], ["w-kfcode", "", "kfcode"], ["w-two", "", "two"]]) {
    for (const ck of ["fine", "coarse", "rm"]) {
        const testid = cell === "w-two" ? "w-two-site" : cell;
        const s = base(`p3-fold-${tag}-${ck}`, cell, ck, extra, testid);
        if (cell === "w-two") s.track.push({ as: "ctlA", sel: T("w-two-a") + " .dock-plate" }, { as: "ctlB", sel: T("w-two-b") + " .dock-plate" });
        s.steps = ck === "coarse"
            ? [{ do: "mark", name: "tap" }, { do: "click", sel: `${T(testid)} .dock-layer--summary` }, SETTLE(), { do: "mark", name: "outside" }, OUTSIDE, SETTLE()]
            : [{ do: "leave", to: [8, 8] }, { do: "mark", name: "enter" }, { do: "hover", sel: T(testid), ms: 120, hz: 60 }, SETTLE(), { do: "mark", name: "outside" }, OUTSIDE, SETTLE()];
        add(s);
    }
}
for (const ck of ["coarse"]) {
    const s = base(`p3-fold-seatscroll-${ck}`, "w-seat", ck);
    s.steps = [{ do: "click", sel: `${T("w-seat")} .dock-layer--summary` }, SETTLE(), { do: "eval", js: "const r=document.querySelector('[data-testid=w-seat] .dock-run'); r.scrollLeft=(r.scrollWidth-r.clientWidth)/2" }, SETTLE(), { do: "mark", name: "outside" }, OUTSIDE, SETTLE(), { do: "mark", name: "tap" }, { do: "click", sel: `${T("w-seat")} .dock-layer--summary` }, SETTLE()];
    add(s);
}
// The page's buttons are pressed by element.click(): a pointer press outside the dock is a
// dismissal (RU-1), and these cells read a content change in the open dock.
// G-4: a return to the face still on screen at 30 and 60 %; a fold during a swap; a seat
// added and removed by v-if; a route that changes the seat set; a persistent region
// mounting and leaving (the outlet's route); value.js's Tools to Tool swap.
for (const f of [0.3, 0.6]) {
    const pct = Math.round(f * 100);
    const s = base(`p3-swap-return-${pct}`, "w-xf", "fine");
    s.steps = [{ do: "mark", name: "to4" }, { do: "click", sel: T("w-xf-layers") }, { do: "wait", ms: Math.round(f * 280) }, { do: "mark", name: `return-${pct}` }, { do: "click", sel: T("w-xf-assets") }, SETTLE(500, 3000)];
    s.track.push({ as: "face", sel: `${T("w-xf")} .dock-face`, all: true, chain: true, styles: ["translate"] });
    add(s);
}
{
    const s = base("p3-swap-fold-during", "w-lseats", "fine");
    s.steps = [{ do: "leave", to: [8, 8] }, { do: "hover", sel: T("w-lseats"), ms: 100, hz: 60 }, SETTLE(), { do: "focus", sel: `${T("w-lseats")} [role=tab][aria-selected=true]` }, { do: "mark", name: "swap" }, { do: "key", key: "ArrowDown" }, { do: "wait", ms: 90 }, { do: "mark", name: "fold" }, ESC("w-lseats"), { do: "leave", to: [8, 800] }, SETTLE(500, 3000)];
    s.track.push({ as: "face", sel: `${T("w-lseats")} .dock-face`, all: true, chain: true, styles: ["translate"] });
    add(s);
}
for (const ck of ["fine", "rm"]) {
    const s = base(`p3-seatset-${ck}`, "w-seatset", ck);
    s.steps = [{ do: "leave", to: [8, 8] }, { do: "hover", sel: T("w-seatset"), ms: 100, hz: 60 }, SETTLE(), { do: "leave", to: [8, 120] },
        { do: "mark", name: "add" }, { do: "eval", js: "document.querySelector('[data-testid=w-seatset-add]').click()" }, SETTLE(),
        { do: "mark", name: "remove" }, { do: "eval", js: "document.querySelector('[data-testid=w-seatset-add]').click()" }, SETTLE(),
        { do: "mark", name: "route" }, { do: "eval", js: "document.querySelector('[data-testid=w-seatset-route]').click()" }, SETTLE()];
    add(s);
    const r = base(`p3-region-${ck}`, "w-g7", ck);
    r.steps = [{ do: "leave", to: [8, 8] }, { do: "hover", sel: T("w-g7"), ms: 100, hz: 60 }, SETTLE(), { do: "leave", to: [8, 120] },
        { do: "mark", name: "leave-open" }, { do: "eval", js: "document.querySelector('[data-testid=w-g7-toggle-route]').click()" }, SETTLE(),
        { do: "mark", name: "mount-open" }, { do: "eval", js: "document.querySelector('[data-testid=w-g7-toggle-route]').click()" }, SETTLE(),
        { do: "mark", name: "outside" }, OUTSIDE, SETTLE(500, 9000),
        { do: "mark", name: "leave-folded" }, { do: "eval", js: "document.querySelector('[data-testid=w-g7-toggle-route]').click()" }, SETTLE(),
        { do: "mark", name: "mount-folded" }, { do: "eval", js: "document.querySelector('[data-testid=w-g7-toggle-route]').click()" }, SETTLE()];
    add(r);
}
for (const ck of ["fine", "coarse", "rm"]) {
    const s = base(`p3-swap-color-${ck}`, "w-color", ck);
    s.steps = [{ do: "mark", name: "to-tool" }, { do: "click", sel: T("w-color-tool") }, SETTLE(), { do: "mark", name: "to-tools" }, { do: "click", sel: T("w-color-tools") }, SETTLE()];
    s.track.push({ as: "face", sel: `${T("w-color")} .dock-face`, all: true, chain: true, styles: ["translate"] });
    add(s);
}
// G-9: the follower through a reversal.
{
    const s = base("p3-scope-rev", "w-scope", "fine");
    s.track.push({ as: "follower", sel: T("w-scope-follower") }, { as: "scopehost", sel: T("w-scope-host"), props: ["--dock-expand-t"] });
    s.steps = [{ do: "leave", to: [8, 8] }, { do: "mark", name: "enter" }, { do: "hover", sel: T("w-scope"), ms: 100, hz: 60 }, { do: "wait", ms: 110 }, { do: "mark", name: "reverse-50" }, ESC("w-scope"), { do: "leave", to: [8, 8] }, SETTLE(500, 3000)];
    add(s);
}
writeFileSync(new URL("../lists/p3.txt", import.meta.url), names.map((n) => `proto ${n}`).join("\n") + "\n");
console.log(names.length, "scenarios");
