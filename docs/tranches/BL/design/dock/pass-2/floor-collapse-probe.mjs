// floor-collapse-probe.mjs: a per-rAF log of one warm collapse on the `morph` scene, for
// the floor's collapse regression (FLOOR.md §4). Reads DOM only: the root's rect, its
// classes, [data-morphing], the inline --dock-morph-t / --dock-expanded-px /
// --dock-collapsed-px, and the plate's painted rect through the adapter's extent().
//
//   node floor-collapse-probe.mjs --build <dir> --adapter <file> [--engine chromium]
import { parseArgs, openTarget, launch, openScene, waitRest, loadAvg } from "../harness/lib.mjs";

const args = parseArgs();
const target = await openTarget(args);
const engine = args.engine === "all" ? "chromium" : args.engine;
const browser = await launch(engine);
const faces = (page) => page.evaluate(() => {
    const root = window.__dockProbe.root();
    return [...root.querySelectorAll(".dock-layer--summary, .dock-layer--full")].map((el) => {
        const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
        return `${el.classList.contains("dock-layer--summary") ? "summary" : "full"}${el.classList.contains("is-active") ? "(active)" : "(inactive)"} ${r.width.toFixed(2)}x${r.height.toFixed(2)} pos ${cs.position} block-size ${cs.blockSize} aspect ${cs.aspectRatio}`;
    }).join(" | ");
});
for (const [scene, query] of [["morph", {}], ["vmorph", {}]]) {
    const o = await openScene(browser, target, scene, { query });
    await waitRest(o.page, { quiet: 300, cap: 4000 });
    const read = async () => `${scene} ${JSON.stringify(query)} posture ${await o.page.evaluate(() => window.__dockProbe.posture())}: ${await faces(o.page)}; endpoints ${await o.page.evaluate(() => { const st = window.__dockProbe.root().style; return st.getPropertyValue("--dock-collapsed-px") + " / " + st.getPropertyValue("--dock-expanded-px"); })}; root ${await o.page.evaluate(() => { const r = window.__dockProbe.root().getBoundingClientRect(); return r.width.toFixed(2) + "x" + r.height.toFixed(2); })}`;
    console.log(await read());
    await o.page.evaluate(() => window.__scene.expand()); await waitRest(o.page, { quiet: 400, cap: 4000 });
    console.log(await read());
    await o.close();
}
const s = await openScene(browser, target, "morph");
const p = s.page;
const box = await p.evaluate(() => { const r = window.__dockProbe.root().getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await p.mouse.move(box.x, box.y);
await waitRest(p, { quiet: 500, cap: 6000 });
await p.evaluate(() => {
    const P = window.__dockProbe, root = P.root(), log = (window.__probeLog = []);
    const t0 = performance.now();
    const tick = () => {
        const r = root.getBoundingClientRect(), e = P.extent(), st = root.style;
        log.push({ t: +(performance.now() - t0).toFixed(1), cls: root.className.replace(/\s+/g, "."), morphing: root.hasAttribute("data-morphing"), rootW: +r.width.toFixed(2), plateW: +(e.r - e.l).toFixed(2), mt: st.getPropertyValue("--dock-morph-t"), exp: st.getPropertyValue("--dock-expanded-px"), col: st.getPropertyValue("--dock-collapsed-px"), scale: getComputedStyle(root).scale });
        if (performance.now() - t0 < 5500) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
});
await p.mouse.move(4, 4);
await p.waitForTimeout(5800);
const log = await p.evaluate(() => window.__probeLog);
let last = "";
for (const f of log) {
    const key = JSON.stringify({ ...f, t: 0 });
    if (key !== last) console.log(JSON.stringify(f));
    last = key;
}
console.log(`engine ${engine} · load ${loadAvg()}`);
await s.close();
await browser.close();
await target.close();
