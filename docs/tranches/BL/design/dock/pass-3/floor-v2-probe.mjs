// floor-v2-probe.mjs: the floor v2 seat's own reads (D2 pass 3, FLOOR-V2.md). DOM reads only.
//
//   node floor-v2-probe.mjs overflow --build <dir> --adapter <file> [--engine chromium,webkit]
//   node floor-v2-probe.mjs census   --build <dir> [--engine chromium] [--routes a,b,…]
//   node floor-v2-probe.mjs roving   --build <dir> --adapter <file> [--engine chromium,webkit]
//
// overflow (N-2): the `fit` scene with the root held 48 px wider than its content (the run
//   is the sole flexible member, so it fills the hold and its size stops tracking its
//   seats). Icon seats are inserted one per frame by DOM until the seats' layout demand
//   exceeds the run's content box. A run whose demand exceeds its box must carry
//   [data-overflowing] (FLOOR row 5; the paint-gutter scroller). No ResizeObserver fires
//   for such an insertion (no observed box changes), so only the content observer hears it.
//   PASS: after the last insertion and 3 frames, flag === (demand > content + 0.5).
//   Recorded beside it: how far any seat's painted rect (ancestor clips applied, the harness's
//   paintedRect) reaches beyond the plate (px), the demand and the content box.
// roving (N-2, W2's keyboard reach): the `long` scene. A seat (index 7) is focused by script, as W2's ring
//   check does, then focus moves to a button outside the dock. Recorded: the tab stops (tabIndex per seat),
//   the seat a Tab from outside lands on, and the seat Home reaches from there, then ArrowLeft to the start.
// census (N-1, N-4): every `.glass-dock` on each demo route: its border-box rect, its
//   margins, its parent's display / justify / align and content width, whether it sits centred
//   in its parent's content box, and whether its run carries [data-overflowing]. Run on two builds and joined by FLOOR-V2.md.
import fs from "node:fs";
import { parseArgs, engines, openTarget, launch, openScene, waitRest, loadAvg, serve, playwright } from "../harness/lib.mjs";
import path from "node:path";

const args = parseArgs();
const arm = args.positional[0];
const out = [];
const log = (o) => { out.push(o); console.log(JSON.stringify(o)); };

if (arm === "overflow") {
    const target = await openTarget(args);
    for (const engine of engines(args)) {
        const browser = await launch(engine);
        try {
            const s = await openScene(browser, target, "fit");
            await waitRest(s.page, { quiet: 300, cap: 4000 });
            const r = await s.page.evaluate(async () => {
                const frame = () => new Promise((f) => requestAnimationFrame(() => f()));
                const P = window.__dockProbe, root = P.root();
                const run = root.querySelector(".dock-run");
                root.style.width = root.getBoundingClientRect().width + 48 + "px";
                for (let k = 0; k < 6; k++) await frame();
                await new Promise((f) => setTimeout(f, 300));
                const cells = () => {
                    const out = [];
                    const walk = (el) => { for (const c of el.children) { if (getComputedStyle(c).display === "contents") walk(c); else out.push(c); } };
                    walk(run); return out;
                };
                const read = () => {
                    const cs = getComputedStyle(run);
                    const content = run.getBoundingClientRect().width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth);
                    const cl = cells();
                    let demand = 0;
                    for (const c of cl) { const ccs = getComputedStyle(c); demand += c.getBoundingClientRect().width + parseFloat(ccs.marginLeft) + parseFloat(ccs.marginRight); }
                    demand += (parseFloat(cs.columnGap) || 0) * Math.max(0, cl.length - 1);
                    const plate = P.extent();
                    let beyond = 0;
                    for (const seat of P.seats({ all: true })) { const b = window.__hp.paintedRect(seat); if (b.r - b.l > 0.5) beyond = Math.max(beyond, b.r - plate.r, plate.l - b.l); }
                    return { content: +content.toFixed(2), demand: +demand.toFixed(2), flag: run.hasAttribute("data-overflowing"), beyond: +Math.max(0, beyond).toFixed(2), scroller: getComputedStyle(run).overflowX };
                };
                const before = read();
                const tpl = run.querySelector(".dock-icon-button");
                let inserted = 0;
                for (let k = 0; k < 12 && read().demand <= read().content + 0.5; k++) {
                    const c = tpl.cloneNode(true); c.removeAttribute("data-testid"); c.setAttribute("aria-label", "Added " + k);
                    tpl.parentElement.insertBefore(c, tpl);
                    inserted++;
                    await frame();
                }
                for (let k = 0; k < 3; k++) await frame();
                await new Promise((f) => setTimeout(f, 200));
                return { before, after: read(), inserted };
            });
            const pass = r.after.flag === (r.after.demand > r.after.content + 0.5);
            log({ arm, engine, build: target.label, pass, ...r, load: loadAvg() });
            await s.close();
        } finally { await browser.close(); }
    }
    await target.close();
} else if (arm === "roving") {
    const target = await openTarget(args);
    for (const engine of engines(args)) {
        const browser = await launch(engine);
        try {
            const s = await openScene(browser, target, "long");
            await waitRest(s.page, { quiet: 300, cap: 4000 });
            const p = s.page;
            const TAB = engine === "chromium" ? "Tab" : "Alt+Tab";
            const at = () => p.evaluate(() => { const S = window.__dockProbe.seats(); return S.findIndex((x) => x === document.activeElement); });
            const stops = () => p.evaluate(() => window.__dockProbe.seats().map((e, i) => (e.tabIndex === 0 ? i : null)).filter((i) => i !== null).join(","));
            const before = await stops();
            await p.evaluate(() => { const el = window.__dockProbe.seats()[7]; el.scrollIntoView({ block: "nearest", inline: "nearest" }); el.focus({ preventScroll: true }); });
            await p.waitForTimeout(250);
            await p.evaluate(() => { const b = document.createElement("button"); b.id = "hp-kb-start"; b.textContent = "start"; b.style.cssText = "position:fixed;left:0;top:0;opacity:0.01"; document.body.prepend(b); b.focus(); });
            await p.waitForTimeout(150);
            const afterFocus = await stops();
            await p.keyboard.press(TAB); const tabLands = await at();
            await p.keyboard.press("Home"); await p.waitForTimeout(100); const home = await at();
            await p.keyboard.press("ArrowRight"); await p.keyboard.press("ArrowLeft"); await p.waitForTimeout(100); const back = await at();
            log({ arm, engine, build: target.label, stopsAtLoad: before, stopsAfterScriptFocus7: afterFocus, tabLandsOn: tabLands, homeReaches: home, arrowLeftReaches: back, pass: home === 0 && back === 0, load: loadAvg() });
            await s.close();
        } finally { await browser.close(); }
    }
    await target.close();
} else if (arm === "census") {
    const build = path.resolve(args.build);
    const meta = JSON.parse(fs.readFileSync(path.join(build, "build.json"), "utf8"));
    const srv = await serve(path.join(build, "demo"));
    const routes = (args.routes ?? "/,/dock,/dock/overview,/dock/controls,/dock/cta-receive,/dock/dock-search,/dock/layers,/dock/overflow,/dock/sections,/dock/vertical,/display/dark-mode-toggle,/feedback/progress").split(",");
    for (const engine of engines(args)) {
        const browser = await playwright[engine].launch({ headless: true });
        for (const route of routes) {
            const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
            const page = await context.newPage();
            const errors = [];
            page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
            await page.goto(srv.url + route, { waitUntil: "load" });
            await page.waitForTimeout(2500);
            const docks = await page.evaluate(() => [...document.querySelectorAll(".glass-dock")].map((el, i) => {
                const r = el.getBoundingClientRect(), cs = getComputedStyle(el), par = el.parentElement, pcs = getComputedStyle(par), pr = par.getBoundingClientRect();
                const cl = pr.left + parseFloat(pcs.paddingLeft) + parseFloat(pcs.borderLeftWidth), cr = pr.right - parseFloat(pcs.paddingRight) - parseFloat(pcs.borderRightWidth);
                const label = el.getAttribute("aria-label") || el.getAttribute("data-testid") || [...el.classList].filter((c) => !/^(glass-dock|expanded|collapsed|pinned|compact|fit-content|always-expanded|vertical|horizontal)$/.test(c)).join(".");
                return {
                    i, label, x: +r.left.toFixed(2), y: +r.top.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2),
                    margin: [cs.marginTop, cs.marginRight, cs.marginBottom, cs.marginLeft].join(" "),
                    parent: `${par.tagName.toLowerCase()}${par.className && typeof par.className === "string" ? "." + par.className.trim().split(/\s+/).slice(0, 4).join(".") : ""}`,
                    pdisplay: pcs.display, pdir: pcs.flexDirection, pjustify: pcs.justifyContent, palign: pcs.alignItems, ptext: pcs.textAlign, position: cs.position,
                    gapL: +(r.left - cl).toFixed(2), gapR: +(cr - r.right).toFixed(2), pcontent: +(cr - cl).toFixed(2),
                    overflowing: !!el.querySelector(".dock-run[data-overflowing], [data-overflowing]"),
                };
            }));
            log({ arm, engine, build: meta.label, route, errors: errors.length, docks, load: loadAvg() });
            await context.close();
        }
        await browser.close();
    }
    await srv.close();
} else {
    console.error("usage: node floor-v2-probe.mjs overflow|census --build <dir> [--adapter <file>]");
    process.exit(2);
}
if (args.out) fs.writeFileSync(args.out, out.map((o) => JSON.stringify(o)).join("\n") + "\n");
