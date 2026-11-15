// films.mjs <tree> <form> <spec-id> <route> [frames=10]: one film strip of a leave, from the
// Chromium screencast (one image per painted frame), from the leave action on.
// Writes films/<spec>.<route>.<tree>.<form>.png (via strip.py) and deletes the frames.
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { withBrowser, cell, gotoComp, sleep, EX, HERE } from "./lib.mjs";
import { SPECS } from "./specs.mjs";

const [tree, form, id, route, nArg = "10"] = process.argv.slice(2);
const spec = SPECS.find((s) => s.id === id);
const RM = process.env.RM === "1";
const C = form === "phone" ? { w: 390, h: 844, touch: true, rm: RM } : { w: 1440, h: 900, touch: false, rm: RM };
const tmp = join(EX, "films", `.tmp-${id}-${route}`);
mkdirSync(tmp, { recursive: true });
// reuse the runner's action interpreter by importing it lazily (exits.mjs runs on import, so
// the few actions the strips need are restated here)
async function tapSel(P, sel) {
    const b = await P.page.evaluate((s) => { const e = [...document.querySelectorAll(s)].find((x) => x.getBoundingClientRect().width); if (!e) return null; const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, sel);
    if (!b) throw new Error("no " + sel);
    await tapXY(P, b[0], b[1]);
}
async function tapXY(P, x, y) {
    if (C.touch) {
        await P.cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y, id: 1 }] });
        await sleep(50);
        await P.cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    } else await P.page.mouse.click(x, y);
}
async function doAct(P, a) {
    if (Array.isArray(a)) { for (const x of a) await doAct(P, x); return; }
    if (a.tap) return tapSel(P, a.tap);
    if (a.tapNth) { const [s, n] = a.tapNth; const b = await P.page.evaluate(([s, n]) => { const l = [...document.querySelectorAll(s)]; const r = l[Math.min(n, l.length - 1)].getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, [s, n]); return tapXY(P, ...b); }
    if (a.tapVisible) return tapSel(P, a.tapVisible);
    if (a.tapText) { const b = await P.page.evaluate((t) => { const e = [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === t); e.scrollIntoView({ block: "center" }); const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, a.tapText); return tapXY(P, ...b); }
    if (a.key) return P.page.keyboard.press(a.key);
    if (a.outside) return tapXY(P, 16, 25);
    if (a.wait) return sleep(a.wait);
    throw new Error("films: unsupported action " + JSON.stringify(a));
}
const frames = [];
let pre = null;
await withBrowser("chromium", async (b) => {
    await cell(b, "chromium", C, async (P) => {
        await gotoComp(P, tree, spec.page);
        await doAct(P, spec.open);
        await sleep(1300);
        let t0 = 0, recording = false; pre = null;
        P.cdp.on("Page.screencastFrame", async (f) => {
            P.cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
            if (!recording) { pre = { t: f.metadata.timestamp * 1000, data: f.data }; return; }
            frames.push({ t: f.metadata.timestamp * 1000, data: f.data });
        });
        await P.cdp.send("Page.startScreencast", { format: "jpeg", quality: 70, maxWidth: C.w, maxHeight: C.h, everyNthFrame: 1 });
        await sleep(300);
        recording = true;
        t0 = Date.now();
        frames.push({ t: t0, mark: true });
        await doAct(P, spec.routes[route]);
        await sleep(700);
        recording = false;
        await P.cdp.send("Page.stopScreencast");
    });
});
const real = [...(pre ? [pre] : []), ...frames.filter((f) => f.data)];
const tAct = frames[0].t;
const n = +nArg;
// first frame at/after the action, then n consecutive painted frames
const files = [];
const pick = real.length > n ? [...real.slice(0, n - 3), ...real.slice(-3)] : real;
pick.forEach((f, k) => { const p = join(tmp, `f${String(k).padStart(2, "0")}_${Math.round(f.t - tAct)}.jpg`); writeFileSync(p, Buffer.from(f.data, "base64")); files.push(p); });
const out = join(EX, "films", `${id}.${route}.${tree}.${form}${RM ? ".rm" : ""}.png`);
execFileSync("python3", ["-I", join(HERE, "strip.py"), out, `${id} / ${route} / ${tree} / ${form}${RM ? " / reduced motion" : ""} (ms after the action; the first frame is the last one before it)`, ...files]);
rmSync(tmp, { recursive: true, force: true });
console.log(out, real.length, "frames captured");
