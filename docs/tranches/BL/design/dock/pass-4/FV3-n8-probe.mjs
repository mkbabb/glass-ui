// FV3-n8-probe.mjs: floor v3 N-8, F-19's keyboard reach on the long vertical run (D2 pass 4, FLOOR-V3 seat).
// Reads the W2 `rail` scene (11 seats, Seat 3 current, run capped at 560 px) on a build, per engine:
//   tab    Tab (Option-Tab in Playwright WebKit) from a start button before the dock: which seat takes the stop
//   up     from the stop, ArrowUp until it stops moving: every seat before the stop, in order
//   down   from Seat 1 (reached by the keyboard, not by focus()), ArrowDown until it stops: every seat after
//   home/end  Home and End from the stop
// For every seat the keyboard focuses, after the reach glide settles: is the seat fully inside the run's port
// (≤ 1 px slack, useDockRun's own `occluded` rule)? That is F-19's "every focused seat lies inside the port".
// It also replays W2's own key sequence (n+6 Tabs, focus() Seat 1, n+2 ArrowDowns, recording after each key
// only) so the witness's miss can be set beside the product's reach.
//   node FV3-n8-probe.mjs --build <dir> --adapter <adapter.mjs> [--engine chromium,webkit] [--out <json>]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const H = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../harness");
const { parseArgs, engines, launch, openTarget, openScene, loadAvg, ENGINE_LABEL } = await import(path.join(H, "lib.mjs"));

const args = parseArgs();
const target = await openTarget(args);
const result = { label: target.label, rows: [] };

const state = (page) => page.evaluate(() => {
    const P = window.__dockProbe; const s = P.seats(); const a = document.activeElement;
    const i = s.findIndex((x) => x === a || x.contains(a));
    const run = s[0]?.closest(".dock-run") ?? s[0]?.parentElement;
    let inPort = null;
    if (i >= 0 && run) { const p = run.getBoundingClientRect(), b = s[i].getBoundingClientRect(); inPort = b.top >= p.top - 1 && b.bottom <= p.bottom + 1 && b.left >= p.left - 1 && b.right <= p.right + 1; }
    return { i, name: i >= 0 ? (s[i].getAttribute("aria-label") || s[i].textContent || "").trim() : (a?.id || a?.tagName), inPort, scroll: run ? Math.round(run.scrollTop) : null, n: s.length, tabStops: s.map((x) => (x.matches("button,a,[tabindex]") ? x : x.querySelector("button,a,[tabindex]"))?.tabIndex ?? null) };
});
const settle = (page) => page.waitForTimeout(700);

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const TAB = engine === "chromium" ? "Tab" : "Alt+Tab";
    try {
        const s = await openScene(browser, target, "rail");
        const pg = s.page;
        const row = { engine: ENGINE_LABEL[engine], load: loadAvg(), steps: [] };
        const log = async (key) => { if (key) await pg.keyboard.press(key); await settle(pg); const st = await state(pg); row.steps.push({ key, ...st }); return st; };
        await pg.mouse.move(4, 4);
        await pg.evaluate(() => { const b = document.createElement("button"); b.id = "n8-start"; b.textContent = "start"; b.style.cssText = "position:fixed;left:0;top:0;opacity:0.01"; document.body.prepend(b); b.focus(); });
        row.initialStops = (await state(pg)).tabStops;
        let st = await log(TAB);
        row.stop = st.name;
        const seen = new Map(); const note = (x) => { if (x.i >= 0) seen.set(x.i, x.inPort && (seen.get(x.i) ?? true)); };
        note(st);
        for (let k = 0; k < st.n + 1; k++) { const prev = st.i; st = await log("ArrowUp"); note(st); if (st.i === prev) break; }
        for (let k = 0; k < st.n + 1; k++) { const prev = st.i; st = await log("ArrowDown"); note(st); if (st.i === prev) break; }
        st = await log("Home"); note(st); row.home = st.name;
        st = await log("End"); note(st); row.end = st.name;
        row.reached = [...seen.keys()].sort((a, b) => a - b).map((i) => i + 1);
        row.allInPort = [...seen.values()].every(Boolean);
        row.notInPort = [...seen.entries()].filter(([, v]) => !v).map(([i]) => i + 1);
        row.keyboardAll = seen.size === st.n;
        // W2's own sequence, as w2-run.mjs reach() presses it
        await pg.evaluate(() => { const b = document.getElementById("n8-start"); b.focus(); });
        const w2 = new Set();
        for (let k = 0; k < st.n + 6; k++) { await pg.keyboard.press(TAB); const x = await state(pg); if (x.i >= 0) w2.add(x.i); }
        await pg.evaluate(() => window.__dockProbe.seats()[0].focus());
        for (let k = 0; k < st.n + 2; k++) { await pg.keyboard.press("ArrowDown"); const x = await state(pg); if (x.i >= 0) w2.add(x.i); }
        row.w2Sequence = { seen: [...w2].sort((a, b) => a - b).map((i) => i + 1), missing: Array.from({ length: st.n }, (_, i) => i).filter((i) => !w2.has(i)).map((i) => i + 1) };
        row.loadAfter = loadAvg();
        result.rows.push(row);
        console.log(`${row.engine}  stop ${row.stop}; keyboard reached ${row.reached.length}/${st.n} (${row.reached.join(",")}); every focused seat inside the port: ${row.allInPort}${row.notInPort.length ? " (not: " + row.notInPort.join(",") + ")" : ""}; Home → ${row.home}, End → ${row.end}; W2's sequence misses [${row.w2Sequence.missing.join(",")}]  [load ${row.load}-${row.loadAfter}]`);
        await s.close();
    } catch (e) {
        result.rows.push({ engine: ENGINE_LABEL[engine], error: String(e).slice(0, 400), load: loadAvg() });
        console.log(`${ENGINE_LABEL[engine]}  ERROR ${String(e).slice(0, 300)}`);
    } finally { await browser.close(); }
}
await target.close();
if (args.out) { fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true }); fs.writeFileSync(path.resolve(args.out), JSON.stringify(result, null, 2)); }
