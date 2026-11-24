#!/usr/bin/env node
// families.mjs <raw-dir> [--routes a,b,c] [--out families.json]
// Folds every probe reading (<tag>.<engine>.<cell>.json) into fault families by the
// element that breaks the box (its class, its text) and the box itself. One row per
// family, tag, engine and cell: the classes seen, the routes, the largest excess.
// --routes limits the fold to those routes (to set a cure run beside its base run).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
const opt = Object.fromEntries(process.argv.slice(3).reduce((a, v, i, all) => (v.startsWith("--") && a.push([v.slice(2), all[i + 1]]), a), []));
const only = opt.routes ? new Set(opt.routes.split(",")) : null;

// Ordered: the first family whose test matches takes the reading.
// t = the box's own selector path, b = its breakers' selectors and text joined.
const FAMILIES = [
    ["artefact", "a reading the probe made, not the page", (t, b, k) => /sr-only/.test(t) || k.cls === "b-vertical"],
    ["F1", "SegmentedTabs strip wider than its box", (t, b) => /segmented-tab/.test(b) || /segmented-tabs?[^>]*$/.test(t)],
    ["F2", "detented sheet at a narrow rung", (t, b, k) => k.route === "/containers/sheet" && /sheet-content/.test(t + b)],
    ["F2c", "the toast body's grid column (Toaster.vue), the toast past the screen", (t) => /li\[data-slot=toast\][^>]*( > div\.grid[^>]*)?$/.test(t)],
    ["F4a", "Timeline end targets past the plate", (t, b) => /tl__mark-seat/.test(b)],
    ["F4b", "PagerDots wider than its box", (t, b) => /goo-dot|goo-body|goo-neck/.test(t + b)],
    ["designed-dock", "dock: the run's 4 px focus-ring reserve, the run strip, the status live region, a trigger's coarse hit slop (touch-floor.css), the rail's summary layer inside the dock's padding", (t, b, k) =>
        /dock-run-status/.test(t) || (/dock-layer--full/.test(b) && (k.max ?? 0) <= 4) || (/dock-layer--summary/.test(t + b) && (k.max ?? 0) <= 12) || (k.cls === "b-horizontal" && /dock-run/.test(t)) || /dock-trigger[^>]*$/.test(t)],
    ["designed-strip", "a wide table scrolling inside the DataTable demo's own scroller", (t) => /data-table-stage[^>]*$/.test(t)],
    ["designed-motion", "the Alert stage mid-entrance: nothing is past it 1.5 s later (triage)", (t) => /alert-stage[^>]*( > div\.stage-swap-pane)?$/.test(t)],
    ["badge", "Badge never wraps (house ruling): beyond its contract", (t, b) => /badge/.test(b) || /badge-stage[^>]*$/.test(t)],
    ["designed-paint", "a paint or a strip the part means (shimmer, reveal, deck strip, staff window, blob bleed, range fill, status marks, corner hit area, halo)", (t, b) =>
        /skeleton|hm-reveal|deck-stage|deck-strip|music-staff|goo-blob|slider-range|status-dot|feedback-mark|avatar__st|avatar-status|dot-ring|glass-corner-affordance|graded-halo/.test(t + b)],
    ["demo-stage", "the demo's own stage or chassis CSS under the stress pass", (t) => /deck-demo|toc-stage|radii-stage|shadows-stage/.test(t)],
    ["F7", "a selected Chip's flood scale (glass-chip.css:27-28) past a full-width parent; a fault where that parent scrolls", (t, b, k) => /glass-chip/.test(b) && k.ratio > 1 && k.ratio <= 1.08],
    ["F5", "LabeledField side by side in a narrow box: its layout collapses by viewport width, not by its box", (t, b, k) =>
        /labeled-field-control[^>]*$/.test(t) || (/labeled-field-control > input/.test(b) && (k.max ?? 0) <= 20)],
    ["menu-indicator", "menu check column narrower than its icon (inside the row's padding)", (t) => /menu__indicator/.test(t)],
    ["F6", "an icon Button squeezed below its icon (min-inline-size: 0)", (t, b, k) => /button\[data-slot=button\][^>]*$/.test(t) && /svg/.test(b) && (k.max ?? 0) <= 10],
    ["F3", "a long word in a part's text (Label, Button, Chip, ToggleGroup item, menu row, Select, Command, Accordion, Popover, Toast)", (t, b) =>
        /district_enr|label\[data-slot=label\]|data-slot=(command|accordion|menu|popover|select|toggle-group|toast|labeled-field)|glass-chip|button\[data-slot=button\]|ovf-narrow > button|ovf-chips|disclosure|menu__|select-viewport|role=option/.test(t + b)],
    ["menu-indicator", "menu check column narrower than its icon (inside the row's padding)", (t) => /menu__indicator/.test(t)],
    ["demo-stage", "the demo's own stage or chassis CSS under the stress pass", (t, b) =>
        /story-variant-items|checks-stage|deck-demo|toc-stage|radii-stage|shadows-stage|pane-dock|card\.pane|alert-stage|expandable-stage|auth-stage|settings-stage|carousel-stage|select-stage/.test(t + b)],
    ["pan", "a vertical scroller panned sideways by a horizontal swipe (the spill inside it is the cause)", (t, b, k) => k.cls === "b-horizontal" || k.cls === "a-scroller"],
    ["page", "the document wider than the viewport", (t, b, k) => k.cls === "c-page"],
    ["edge-sub2", "past the screen by 2 px or less", (t, b, k) => k.cls === "a-edge" && (k.max ?? 0) <= 2],
    ["other", "a demo stage's clip around an F3 part, with no breaker recorded under it", () => true],
];

const files = readdirSync(dir).filter((f) => /^(base|cure[234]?)\.(chromium|webkit)\..+\.json$/.test(f));
const rows = new Map();
function put(fam, tag, engine, cell, cls, route, step, excess, el, br) {
    const k = `${fam}|${tag}|${engine}|${cell}`;
    if (!rows.has(k)) rows.set(k, { family: fam, tag, engine, cell, classes: {}, routes: {}, max: 0, n: 0, sample: null });
    const r = rows.get(k);
    r.n++;
    r.classes[cls] = (r.classes[cls] || 0) + 1;
    r.routes[route] = Math.max(r.routes[route] || 0, Math.abs(excess || 0));
    if (Math.abs(excess || 0) >= r.max) {
        r.max = Math.abs(excess || 0);
        r.sample = { route, step, el: el.split(" > ").slice(-2).join(" > ").replace(/#[-\w]+/g, ""), breaker: br.slice(0, 160) };
    }
}
for (const f of files) {
    const run = JSON.parse(readFileSync(join(dir, f), "utf8"));
    const [tag] = f.split(".");
    for (const r of run.routes) {
        if (only && !only.has(r.route)) continue;
        for (const s of r.steps) {
            const step = s.trigger ? `${s.step}:${s.trigger.slice(-40)}` : s.step;
            const m = s.m;
            const readings = [];
            // The cell's own width, not innerWidth: under isMobile the layout viewport grows
            // to a page that is too wide, so innerWidth reads 487 on a 487 page at 390.
            const VW = parseInt(run.cell, 10);
            if (m.docSW > VW + 1 || m.pagePan > 0) {
                // The page widens because a box inside it does: name that box's breakers.
                const wide = m.boxes.filter((b) => b.excess >= 2 && !b.designed).flatMap((b) => b.breakers.map((k) => k.el + " " + (k.text || ""))).join(" ");
                readings.push({ cls: "c-page", t: "html", b: wide, max: m.docSW - VW });
            }
            const scrollerBreakers = {};
            // A box's cause is the innermost faulting box under it: follow its widest
            // breaker while that breaker is itself a faulting box in this reading.
            const byKey = Object.fromEntries(m.boxes.filter((b) => b.excess >= 2 || b.kind === "scroller").map((b) => [b.key, b]));
            const leaf = (b) => {
                const seen = new Set();
                let cur = b;
                for (;;) {
                    seen.add(cur.key);
                    const next = [...cur.breakers].sort((x, y) => (y.over || 0) - (x.over || 0)).find((k) => byKey[k.key] && !seen.has(k.key));
                    if (!next) return cur;
                    cur = byKey[next.key];
                }
            };
            for (const b0 of m.boxes) {
                if (b0.ellipsis) continue;
                const lb = leaf(b0);
                const b = { ...b0, breakers: lb.breakers.length ? lb.breakers : b0.breakers, el: lb === b0 ? b0.el : lb.el };
                const br = b.breakers.map((k) => k.el + " " + (k.text || "")).join(" ");
                // The widest breaker's drawn width over its parent's: a scaled child (the
                // selected Chip's flood scale, 1.074) reads as a ratio near its scale.
                const ratio = Math.max(0, ...b.breakers.filter((k) => k.parentW).map((k) => k.w / k.parentW));
                if (b0.kind === "scroller" && !b0.designed) {
                    scrollerBreakers[b0.key] = br;
                    readings.push({ cls: "a-scroller", t: b.el, b: br, max: b0.excess, outer: b0.el, ratio });
                } else if (b0.kind === "spill" && b0.excess >= 2) readings.push({ cls: "a-spill", t: b.el, b: br, max: b0.excess, outer: b0.el, ratio });
                else if (b0.kind === "clipped" && b0.excess >= 2) readings.push({ cls: "a-clipped", t: b.el, b: br, max: b0.excess, outer: b0.el, ratio });
            }
            // An edge reading's excess is how far the box runs past the screen's side; its
            // text stands in for a breaker (a fixed popper wrapper has no part name).
            for (const e of m.edge) readings.push({ cls: "a-edge", t: e.el, b: e.text || "", max: Math.max((e.right ?? 0) - VW, -(e.left ?? 0)) });
            for (const g of s.gestures || []) {
                if (!g.moved) continue;
                for (const mv of g.moved) {
                    const cls = g.gesture === "horizontal" ? "b-horizontal" : "b-vertical";
                    // A pan's cause is the spill in the box it panned.
                    const br = scrollerBreakers[mv.key] || m.boxes.filter((b) => b.excess >= 2 && !b.designed && mv.el && b.el.startsWith(mv.el)).flatMap((b) => b.breakers.map((k) => k.el + " " + (k.text || ""))).join(" ");
                    readings.push({ cls, t: mv.el, b: br, max: mv.d });
                }
            }
            for (const x of readings) x.fam = FAMILIES.find(([, , test]) => test(x.t, x.b, { cls: x.cls, route: r.route, max: Math.abs(x.max), ratio: x.ratio ?? 0 }))[0];
            // A scroller that pans, or a page that widens, with no breaker of its own
            // takes the family of the widest placed spill in the same reading (the probe
            // keeps short paths, so containment is not checked).
            const placed = readings.filter((x) => !/^(pan|page|other|artefact|edge-sub2)$/.test(x.fam) && !/^designed/.test(x.fam));
            for (const x of readings) {
                if (x.fam !== "pan" && x.fam !== "page") continue;
                const inside = placed.filter((y) => y.cls !== "a-clipped").sort((p, q) => Math.abs(q.max) - Math.abs(p.max))[0];
                if (inside) x.fam = inside.fam;
            }
            for (const x of readings) put(x.fam, tag, run.engine, run.cell, x.cls, r.route, step, x.max, x.outer || x.t, x.b);
        }
    }
}
const out = [...rows.values()].sort((a, b) => a.family.localeCompare(b.family) || a.tag.localeCompare(b.tag) || a.engine.localeCompare(b.engine) || a.cell.localeCompare(b.cell));
const names = Object.fromEntries(FAMILIES.map(([id, name]) => [id, name]));
if (opt.out) writeFileSync(opt.out, JSON.stringify({ families: names, rows: out }, null, 1));
for (const r of out) {
    console.log(`${r.family.padEnd(15)} ${r.tag} ${r.engine} ${r.cell.padEnd(10)} n=${String(r.n).padStart(4)} max=${Math.round(r.max)} ${JSON.stringify(r.classes)}`);
    console.log(`   routes: ${Object.entries(r.routes).map(([k, v]) => `${k}(${Math.round(v)})`).join(" ").slice(0, 400)}`);
    if (opt.verbose) console.log(`   sample: ${JSON.stringify(r.sample)}`);
}
