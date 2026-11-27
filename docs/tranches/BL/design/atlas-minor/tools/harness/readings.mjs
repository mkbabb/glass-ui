// readings.mjs: prints ROOT.md's reading tables from the probe's four data files.
//   node readings.mjs <data-dir>
// Reads <data-dir>/{chromium,webkit}-{base,cure}.json, as probe.mjs writes them.
import { readFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2] ?? ".";
const runs = {};
for (const engine of ["chromium", "webkit"])
    for (const build of ["base", "cure"])
        runs[`${engine}-${build}`] = JSON.parse(readFileSync(join(dir, `${engine}-${build}.json`), "utf8"));

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

console.log("\n### Dialog\n");
console.log(row(["run", "cell", "mount: centre of travel, opacity", "first painted", "last painted: centre, opacity", "open rebound w, h px", "close monotone", "largest step open, close", "long frames open, close", "frames open, close"]));
console.log(row(Array(10).fill("---")));
for (const r of Object.keys(runs))
    for (const n of ["dialog-1440", "dialog-390", "dialog-rm-1440"]) {
        const c = cell(r, n);
        if (c.error) { console.log(row([r, n, "ERROR", "", "", "", "", "", "", ""])); continue; }
        console.log(row([
            r, n, `${f3(c.mount.centerOfTravel)}, ${f3(c.mount.opacity)}`,
            c.firstPainted ? `${f3(c.firstPainted.centerOfTravel)}, ${f3(c.firstPainted.opacity)}` : "—",
            c.lastPainted ? `${f3(c.lastPainted.centerOfTravel)}, ${f3(c.lastPainted.opacity)}` : "—",
            `${f1(c.openReboundW)}, ${f1(c.openReboundH)}`, c.closeMonotone ?? "—",
            `${f3(c.maxCenterStepOpen)}, ${f3(c.maxCenterStepClose)}`,
            `${c.longFramesOpen?.length ?? "—"}, ${c.longFramesClose?.length ?? "—"}`,
            `${c.openFrames}, ${c.closeFrames}`,
        ]));
    }
