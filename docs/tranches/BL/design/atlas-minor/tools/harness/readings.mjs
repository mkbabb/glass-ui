// readings.mjs: prints ROOT.md's reading tables from the probe's four data files.
//   node readings.mjs <data-dir>
// Reads <data-dir>/{chromium,webkit}-{base,cure}.json, as probe.mjs writes them; a run with
// no file prints as missing.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2] ?? ".";
const runs = {};
for (const engine of ["chromium", "webkit"])
    for (const build of ["base", "cure"]) {
        const file = join(dir, `${engine}-${build}.json`);
        runs[`${engine}-${build}`] = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : { version: "not run", cells: {} };
    }

const f1 = (v) => (v == null ? "—" : Number(v).toFixed(1));
const f3 = (v) => (v == null ? "—" : Number(v).toFixed(3));
const cell = (run, name) => runs[run].cells[name] ?? { error: "missing" };
const row = (cols) => `| ${cols.join(" | ")} |`;

console.log("versions:", Object.entries(runs).map(([k, r]) => `${k} ${r.version}`).join(", "));

console.log("\n### Verdicts\n");
const names = Object.keys(runs["chromium-cure"].cells);
console.log(row(["cell", "Chromium base", "Chromium cure", "WebKit base", "WebKit cure"]));
console.log(row(["---", "---", "---", "---", "---"]));
for (const n of names)
    console.log(row([n, ...["chromium-base", "chromium-cure", "webkit-base", "webkit-cure"].map((r) => cell(r, n).verdict ?? "ERROR")]));

console.log("\n### Sticky (after 1,500 down and 800 across)\n");
console.log(row(["run", "cell", "table px", "viewport top / left", "host top", "page y", "head top", "corner top, left", "row's first cell left", "on top: head, column", "ground α head, column (rest)"]));
console.log(row(Array(11).fill("---")));
for (const r of Object.keys(runs))
    for (const n of ["sticky-1440", "sticky-390"]) {
        const c = cell(r, n);
        if (c.error) { console.log(row([r, n, "ERROR", "", "", "", "", "", "", "", ""])); continue; }
        console.log(row([
            r, n, c.table, `${c.viewport.scrollTop} / ${c.viewport.scrollLeft}`, c.host.scrollTop, c.page.scrollY,
            f1(c.headTop), `${f1(c.cornerTop)}, ${f1(c.cornerLeft)}`, f1(c.bodyFirstLeft),
            `${c.headOnTop}, ${c.firstColumnOnTop}`, `${c.headGroundAlpha}, ${c.columnGroundAlpha} (${c.rest.headGround})`,
        ]));
    }

console.log("\n### Fit at 1440 (1,202 px region)\n");
console.log(row(["run", "header columns", "expected", "client / scroll width", "folded"]));
console.log(row(Array(5).fill("---")));
for (const r of Object.keys(runs)) {
    const c = cell(r, "fit-1440");
    if (c.error) { console.log(row([r, "ERROR", "", "", ""])); continue; }
    console.log(row([r, c.columns, c.expected, `${c.clientWidth} / ${c.scrollWidth}`, c.fold ? c.fold.join(" ") : "none reported"]));
}

console.log("\n### Cards at 390 (344 px region)\n");
for (const r of Object.keys(runs))
    for (const n of ["cards-table-390", "cards-grid-390"]) {
        const c = cell(r, n);
        if (c.error) { console.log(`${r} ${n}: ERROR`); continue; }
        const t = c.tree;
        if (t.source.startsWith("chromium"))
            console.log(`${r} ${n}: ${t.source}: role ${t.role}, name ${JSON.stringify(t.name)}, ignored ${t.ignored}, rows ${t.rows}, header [${t.headerRow.map((x) => x.role).join(" ")}], first row [${t.firstRow.map((x) => `${x.role} "${x.name}"`).join(", ")}]`);
        else
            console.log(`${r} ${n}: ${t.source}: ${t.snapshot.split("\n").slice(0, 10).join(" / ")}`);
    }

console.log("\n### Virtualized cards at 390 (344 x 600 host, 300 rows, atlas's useVirtualWindow)\n");
console.log(row(["run", "cell", "viewport is the cards", "list flex", "list block / total", "scroll height", "scrollTop after a 4,000 wheel", "host scrollTop", "mounted (rows)", "gap min / max", "overlaps"]));
console.log(row(Array(11).fill("---")));
for (const r of Object.keys(runs))
    for (const n of ["vcards-390", "vcards-shrink-390"]) {
        const c = cell(r, n);
        if (c.error) { console.log(row([r, n, "ERROR", "", "", "", "", "", "", "", ""])); continue; }
        const a = c.after;
        console.log(row([
            r, n, a.viewportIsCards, a.listFlex ?? "—", `${f1(a.listBlock)} / ${f1(a.total)}`, a.scrollHeight,
            f1(a.scrollTop), a.hostScrollTop, `${a.mounted} (${a.firstRow}–${a.lastRow})`,
            `${f1(a.minGap)} / ${f1(a.maxGap)}`, `${c.before.overlaps}, ${a.overlaps}`,
        ]));
    }

console.log("\n### Dialog\n");
console.log("Bounds (one 60 Hz frame of each clock, share of the travel):", JSON.stringify(runs["chromium-cure"].cells["dialog-1440"]?.bound));
console.log("");
console.log(row(["run", "cell", "row", "mount: centre of travel, opacity", "first painted", "last painted: centre, opacity", "open rebound w, h px", "close monotone", "worst step open (over, ms, centre px, width px, opacity)", "worst step close", "frames over 34 ms open, close", "longest frame open, close", "entrance: frames, ms", "frames open, close"]));
console.log(row(Array(14).fill("---")));
const ws = (s) => (s ? `${f3(s.over)}, ${s.ms}, ${s.centre}, ${s.width}, ${s.opacity}` : "—");
for (const r of Object.keys(runs))
    for (const n of ["dialog-1440", "dialog-390", "dialog-heavy-1440", "dialog-heavy-390", "dialog-deep-1440", "dialog-rm-1440"]) {
        const c = cell(r, n);
        if (c.error) { console.log(row([r, n, "ERROR", "", "", "", "", "", "", "", "", "", "", ""])); continue; }
        console.log(row([
            r, n, c.row, `${f3(c.mount.centerOfTravel)}, ${f3(c.mount.opacity)}`,
            c.firstPainted ? `${f3(c.firstPainted.centerOfTravel)}, ${f3(c.firstPainted.opacity)}` : "—",
            c.lastPainted ? `${f3(c.lastPainted.centerOfTravel)}, ${f3(c.lastPainted.opacity)}` : "—",
            `${f1(c.openReboundW)}, ${f1(c.openReboundH)}`, c.closeMonotone ?? "—",
            ws(c.worstOpen), ws(c.worstClose),
            `${c.longOpen?.filter((s) => s.ms > 34).length ?? "—"}, ${c.longClose?.filter((s) => s.ms > 34).length ?? "—"}`,
            `${c.maxFrameGapOpen}, ${c.maxFrameGapClose}`,
            c.settle ? `${c.settle.frames}, ${c.settle.ms}` : "—",
            `${c.openFrames}, ${c.closeFrames}`,
        ]));
    }

console.log("\n### The step across each long frame (heavy cells)\n");
// A sample shows the position one tick late, so the step a frame's tick makes is the one
// between the two samples after it. For each frame over 34 ms: its length, then that step's
// centre px, width px, opacity and its share of the bound.
for (const r of Object.keys(runs))
    for (const n of ["dialog-heavy-1440", "dialog-heavy-390"]) {
        const c = cell(r, n);
        if (c.error) continue;
        const widthSpan = c.row === "panel" ? Math.abs(c.rest.w - c.opener.w) : 0.05 * c.rest.w;
        const across = (frames, ops, b) => {
            const out = [];
            for (let k = 2; k < frames.length; k++) {
                const tick = frames[k - 1][4] - frames[k - 2][4];
                if (tick <= 34) continue;
                const [ax, ay, aw] = frames[k - 1];
                const [bx, by, bw] = frames[k];
                const centre = Math.hypot(bx - ax, by - ay);
                const w = Math.abs(bw - aw);
                const o = Math.abs(ops[k] - ops[k - 1]);
                const over = Math.max(centre / (b * c.travel + 0.5), w / (b * widthSpan + 0.5), o / (b + 0.002));
                out.push(`${tick.toFixed(0)} ms: ${centre.toFixed(1)}, ${w.toFixed(1)}, ${o.toFixed(3)}, ${over.toFixed(3)}`);
            }
            return out.join("; ") || "none";
        };
        console.log(`- ${r} ${n}: long tasks at ${c.longTasks.map((t) => `${t.at} ms (${t.ms} ms)`).join(", ")}. Open: ${across(c.centers.open, c.opacities.open, c.clock.open)}. Close: ${across(c.centers.close, c.opacities.close, c.clock.close)}.`);
    }
