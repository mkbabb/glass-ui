// prof.mjs (D2-G pass 4, the 40-seat flip cost): pcost's expand with N seats (D2-Bp-probes.mjs), under a
// CDP CPU profile at the given throttle; prints the self time per function (name @ file:line), heaviest first.
//   node prof.mjs --build <dir> --adapter <a> [--seats 40] [--throttle 4] [--top 25]
import { parseArgs, openTarget, launch, openScene, waitRest } from "../../harness/lib.mjs";
const args = parseArgs();
const target = await openTarget(args);
const N = Number(args.seats ?? 40), TH = Number(args.throttle ?? 4), TOP = Number(args.top ?? 25);
const browser = await launch("chromium");
try {
    const s = await openScene(browser, target, "morph");
    try {
        await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 400 });
        await s.page.evaluate((N) => { const run = window.__dockProbe.root().querySelector(".dock-run"); const src = [...run.querySelectorAll("[data-dock-seat]")]; let k = 0; while (run.querySelectorAll("[data-dock-seat]").length < N) { const c = src[k++ % src.length].cloneNode(true); c.removeAttribute("data-testid"); run.appendChild(c); } }, N);
        await waitRest(s.page, { quiet: 400 });
        await s.page.evaluate(() => window.__scene.collapse()); await waitRest(s.page, { quiet: 500 });
        const cdp = await s.context.newCDPSession(s.page);
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: TH });
        await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 100 }); await cdp.send("Profiler.start");
        await s.page.evaluate(async () => { window.__scene.expand(); await new Promise((f) => setTimeout(f, 700)); });
        const { profile } = await cdp.send("Profiler.stop");
        const dt = new Map(); const self = new Map();
        const byId = new Map(profile.nodes.map((n) => [n.id, n]));
        for (let i = 0; i < profile.samples.length; i++) { const id = profile.samples[i]; self.set(id, (self.get(id) ?? 0) + (profile.timeDeltas[i] ?? 0)); }
        for (const [id, us] of self) { const n = byId.get(id); const f = n.callFrame; const k = `${f.functionName || "(anon)"} @ ${f.url.split("/").pop()}:${f.lineNumber + 1}:${f.columnNumber + 1}`; dt.set(k, (dt.get(k) ?? 0) + us); }
        const rows = [...dt].sort((a, b) => b[1] - a[1]).slice(0, TOP);
        const total = [...dt.values()].reduce((a, b) => a + b, 0);
        console.log(`${N} seats, ${TH}× throttle: ${(total / 1000).toFixed(1)} ms sampled`);
        for (const [k, us] of rows) console.log(`${(us / 1000).toFixed(1).padStart(8)} ms  ${k}`);
        // the callers of the heaviest natives: self time of each native, by its parent frame
        const parent = new Map(); for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
        const key = (n) => { const f = n.callFrame; return `${f.functionName || "(anon)"} @ ${f.url.split("/").pop()}:${f.lineNumber + 1}:${f.columnNumber + 1}`; };
        for (const nat of ["getBoundingClientRect", "animate", "getKeyframes", "getAnimations", "elementsFromPoint"]) {
            const by = new Map();
            for (const [id, us] of self) { const n = byId.get(id); if (n.callFrame.functionName !== nat || n.callFrame.url) continue; let p = byId.get(parent.get(id)); const chain = []; for (let d = 0; p && d < 3; d++, p = byId.get(parent.get(p.id))) chain.push(key(p)); const k = chain.join(" < "); by.set(k, (by.get(k) ?? 0) + us); }
            console.log(`-- ${nat} by caller`); for (const [k, us] of [...by].sort((a, b) => b[1] - a[1]).slice(0, 5)) console.log(`${(us / 1000).toFixed(1).padStart(8)} ms  ${k}`);
        }
        await cdp.detach();
    } finally { await s.close(); }
} finally { await browser.close(); await target.close(); }
