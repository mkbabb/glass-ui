// sum2.mjs <read2.txt>: read2's values against W-I.8's bounds: the strongest face under 0.3 for
// no more than 50 ms; never both faces above 0.5; no face step over 0.4 in 16.7 ms; a return
// moves no face above 0.1 by more than 0.5 px and stalls no more than 34 ms; a coarse cell
// taps by touch. The window's tail is reported, not judged (rows carry painted boxes, not the
// loop's quantities).
import { readFileSync } from "node:fs";
const fails = [], tails = [];
let n = 0;
for (const line of readFileSync(process.argv[2], "utf8").split("\n")) {
    const m = /^(\S+)\s+(\S+)\s+(\{.*\})$/.exec(line.trim());
    if (!m) continue;
    n++;
    const [, scen, , js] = m, r = JSON.parse(js), v = [];
    if (r.weakMs > 50) v.push(`strongest face under 0.3 for ${r.weakMs} ms`);
    if (r.both > 0.5) v.push(`both faces at ${r.both}`);
    if (r.fade > 0.4) v.push(`face steps ${r.fade} in 16.7 ms`);
    if (r.ret && (r.ret.maxMovePx > 0.5 || r.ret.stallMs > 34)) v.push(`return: moves ${r.ret.maxMovePx} px, stalls ${r.ret.stallMs} ms`);
    if (/coarse|c360/.test(scen) && r.touch === false) v.push("no touch event");
    tails.push(...(r.tails || []));
    if (v.length) fails.push(`${scen}: ${v.join("; ")}`);
}
tails.sort((a, b) => a - b);
console.log(`${n} cells, ${fails.length} failing; window tail ${tails[0]}..${tails[tails.length - 1]} ms (median ${tails[tails.length >> 1]})`);
for (const f of fails) console.log("  " + f);
