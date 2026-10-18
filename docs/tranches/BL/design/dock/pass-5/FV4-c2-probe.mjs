// FV4-c2-probe.mjs (D2 pass 5, FLOOR-V4). Default mode: why CF c2·morph·h reads "root cross drift 157 px" on the collapse of
// floor v4's demo dock (overview, first collapsible dock). A diagnosis, not a witness: it replays CF's collapse
// (hover until expanded, pointer away, sample every frame until collapsed) and prints, per frame, the root's
// box, the extent, the posture and the morph flag, so the drift can be placed on one element and one frame.
// One browser, one context, closed in finally. Engine by --engine (chromium default).
// --mode c3: CF c3·scroll's steps with what holds the dock and every scroll target (the dark Chromium red).
//   node FV4-c2-probe.mjs --build <out>/builds/fv4 --adapter <pass-3/adapter-floor-v2.mjs> [--engine webkit] [--theme dark]
import { parseArgs, openTarget, launch, openScene } from "../harness/lib.mjs";

const args = parseArgs();
const target = await openTarget(args);
const engine = args.engine === "all" ? "chromium" : args.engine;
const SEL = "[data-testid=dock-horizontal-collapsed-first-paint]";
const t = { ...target, url: () => target.demoUrl("/dock/overview"), adapter: { ...target.adapter, rootSel: () => SEL, sidebarRootSel: SEL } };
const ROW = `() => { const P = window.__dockProbe, root = P.root(), rb = root.getBoundingClientRect(), e = P.extent();
  const kids = [...root.children].map((c) => { const q = c.getBoundingClientRect(); return c.className.toString().split(" ")[0] + ":" + Math.round(q.width) + "x" + Math.round(q.height); });
  return { t: Math.round(performance.now()), m: !!P.morphing(), posture: P.posture(), cls: root.className.toString().replace(/\\s+/g, " ").slice(0, 120), w: +rb.width.toFixed(1), h: +rb.height.toFixed(1), x: +rb.left.toFixed(1), y: +rb.top.toFixed(1), e: [e.l, e.t, e.r, e.b].map((v) => Math.round(v)), kids: kids.join(" ") }; }`;
const browser = await launch(engine);
let s = null;
try {
    s = await openScene(browser, t, "sidebar", { settle: 1500, theme: args.theme ?? null });
    const p = s.page;
    await p.evaluate(() => window.__dockProbe.root().scrollIntoView({ block: "center" }));
    await p.mouse.move(2, 2); await p.waitForTimeout(600);
    const r0 = await p.evaluate(`(${ROW})()`);
    if (args.mode === "c3") {
        // CF c3·scroll's steps: hover to expand, pointer 120 px above the dock, wheel 240 px; then per 100 ms the
        // posture, what holds the dock (:hover, :focus-within, :focus-visible), and every scroll event's target.
        await p.evaluate(() => { window.__sc = []; document.addEventListener("scroll", (e) => window.__sc.push((e.target === document ? "document" : (e.target.id ? "#" + e.target.id : "") + "." + String(e.target.className).split(" ").slice(0, 2).join(".")) + " in-dock:" + window.__dockProbe.root().contains(e.target)), { capture: true, passive: true }); });
        const cx = (r0.e[0] + r0.e[2]) / 2, cy = (r0.e[1] + r0.e[3]) / 2;
        await p.mouse.move(cx, cy); await p.waitForTimeout(1200);
        await p.mouse.move(cx, Math.max(20, r0.e[1] - 120)); await p.waitForTimeout(150);
        const st = () => p.evaluate(() => { const r = window.__dockProbe.root(); const a = document.activeElement; return { posture: window.__dockProbe.posture(), m: !!window.__dockProbe.morphing(), hover: r.matches(":hover"), fw: r.matches(":focus-within"), fv: !!r.querySelector(":focus-visible"), active: a ? a.tagName + "." + String(a.className).split(" ")[0] : "null", under: (() => { const e = window.__dockProbe.extent(); return document.elementsFromPoint((e.l + e.r) / 2, Math.max(20, e.t - 120)).slice(0, 3).map((x) => x.tagName + "." + String(x.className).split(" ")[0]).join(" > "); })(), sc: window.__sc.length }; });
        console.log("before wheel", JSON.stringify(await st()));
        await p.mouse.wheel(0, 240);
        for (let k = 0; k < 16; k++) { await p.waitForTimeout(100); console.log(100 * (k + 1), "ms", JSON.stringify(await st())); }
        console.log("scroll targets", JSON.stringify([...new Set(await p.evaluate(() => window.__sc))]));
    } else {
    console.log("rest", JSON.stringify(r0));
    await p.mouse.move((r0.e[0] + r0.e[2]) / 2, (r0.e[1] + r0.e[3]) / 2);
    await p.waitForTimeout(1500);
    console.log("expanded", JSON.stringify(await p.evaluate(`(${ROW})()`)));
    await p.evaluate((src) => { const f = new Function(`return (${src})`)(); const rows = (window.__rows = []); let n = 0; const tick = () => { if (n++ > 900) return; rows.push(f()); requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, ROW);
    await p.mouse.move(2, 2);
    await p.waitForTimeout(13000);
    const rows = await p.evaluate(() => window.__rows);
    let last = "";
    for (const r of rows) { const k = `${r.w}x${r.h}@${r.x},${r.y} ${r.posture} m${+r.m} e${r.e} | ${r.kids}`; if (k !== last) console.log(r.t, k); last = k; }
    const hs = rows.map((r) => r.h), ws = rows.map((r) => r.w);
    console.log(`root height ${Math.min(...hs)}..${Math.max(...hs)}; width ${Math.min(...ws)}..${Math.max(...ws)}; ${rows.length} frames`);
    }
} finally {
    if (s) await s.close().catch(() => {});
    await browser.close();
    await target.close?.();
}
