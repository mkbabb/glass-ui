#!/usr/bin/env node
// Reads probe.mjs result files and prints, for each RO loop error, the deliveries of the
// error frame (observer kind, target depth, border box, stylesheets pending, callback ms)
// and of the next frame (the notifications that were left undelivered).
//   node analyze.mjs out/<dir>/*.json [--brief]
import { readFileSync } from "node:fs";

const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const brief = process.argv.includes("--brief");

export function kind(stack) {
    const s = stack.join("\n");
    if (/useBarShape/.test(s)) return "useBarShape";
    if (/storyTile/.test(s)) return "SectionPreviewCard";
    if (/useSelectionGroup/.test(s)) return "useSelectionGroup";
    if (/useResizeObserver/.test(s)) return "useResizeObserver";
    const m = s.match(/assets\/([A-Za-z][\w.]*?)-[\w-]{8}\.js/);
    return m ? m[1] : "?";
}

const tally = {};
for (const f of files) {
    for (const c of JSON.parse(readFileSync(f, "utf8"))) {
        if (c.noReading) {
            console.log(`${f} ${c.cell}: NO READING`);
            continue;
        }
        const kinds = Object.fromEntries(c.obs.map((o) => [o.id, kind(o.stack)]));
        const key = c.label;
        tally[key] ??= { cells: 0, red: 0, firstWriter: {}, forcer: {} };
        tally[key].cells++;
        if (c.roErrors) tally[key].red++;
        for (const a of c.around) {
            const first = a.errFrame[0];
            // The forcer: the first delivery of the error frame whose callback ran a layout
            // (its run time; a delivery that reads only clean layout costs under 2 ms).
            const forcer = a.errFrame.find((l) => (l.ms ?? 0) >= 2);
            const fkey = forcer ? kinds[forcer.id] : "no callback >= 2ms";
            tally[key].forcer[fkey] = (tally[key].forcer[fkey] ?? 0) + 1;
            const fk = first ? `${kinds[first.id]} d${first.entries[0].depth} ${first.entries[0].bb} pending=${first.pending} ${first.ms}ms` : "none";
            tally[key].firstWriter[first ? `${kinds[first.id]} ${first.entries[0].bb.join("x") === "0x0" ? "0x0" : "sized"} pending>0=${first.pending > 0}` : "none"] =
                (tally[key].firstWriter[first ? `${kinds[first.id]} ${first.entries[0].bb.join("x") === "0x0" ? "0x0" : "sized"} pending>0=${first.pending > 0}` : "none"] ?? 0) + 1;
            if (brief) continue;
            console.log(`\n== ${f.split("/").pop()} ${c.cell} [${c.label}] error at frame ${a.err.frame} t=${a.err.t}`);
            console.log(`   error frame (first: ${fk}):`);
            for (const l of a.errFrame)
                console.log(`     #${l.id} ${kinds[l.id]} t${l.t} ${l.ms}ms pending=${l.pending} ` + l.entries.map((e) => `[d${e.depth} ${e.bb} ${e.el.slice(0, 60)}${e.el.match(/@card\([^)]*\)/)?.[0] ?? ""}]`).join(" "));
            console.log(`   next frame:`);
            for (const l of a.nextFrame)
                console.log(`     #${l.id} ${kinds[l.id]} t${l.t} pending=${l.pending} ` + l.entries.map((e) => `[d${e.depth} ${e.bb} ${e.el.slice(0, 45)}${e.el.match(/@card\([^)]*\)/)?.[0] ?? ""}]`).join(" "));
        }
    }
}
console.log("\n== tally (label: red/cells; error frame's first delivery)");
for (const [k, v] of Object.entries(tally)) console.log(`  ${k}: ${v.red}/${v.cells}  first ${JSON.stringify(v.firstWriter)}  forcer ${JSON.stringify(v.forcer)}`);
