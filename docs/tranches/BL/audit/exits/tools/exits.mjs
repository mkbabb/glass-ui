// exits.mjs <tree> <engine> <form> [scheme=light] [rm=0] [mode=full|glass|first2] [ids...]
// One browser per run; one context per surface (a cell); a fresh page load per route.
// Per surface: ENTER (from the open action), GLASS (computed, at rest open), then for each
// dismissal route a fresh open and the LEAVE read frame by frame; REVERSE where the spec
// asks (dismiss, then reopen 60 ms later). Rows gzipped to rows/, results to logs/results/.
import { withBrowser, cell, gotoComp, box, tap, tapAt, swipe, rec, mark, stop, sleep, readMotion, saveRows, saveJson, setViewport } from "./lib.mjs";
import { SPECS } from "./specs.mjs";

const [tree, engine, form, scheme = "light", rmArg = "0", mode = "full", ...ids] = process.argv.slice(2);
const rm = rmArg === "1";
const C = form === "phone" ? { w: 390, h: 844, touch: true, scheme, rm } : { w: 1440, h: 900, touch: false, scheme, rm };
setViewport(C.w, C.h);
const tag = `${tree}.${engine}.${form}.${scheme}${rm ? ".rm" : ""}`;
const specs = SPECS.filter((s) => !ids.length || ids.includes(s.id));
const out = { tree, engine, form, scheme, rm, mode, at: new Date().toISOString(), surfaces: {} };

async function outsidePoint(P, surf) {
    return await P.page.evaluate((surf) => {
        const s = [...document.querySelectorAll(surf)].map((e) => e.getBoundingClientRect());
        const W = innerWidth, H = innerHeight;
        const cands = [];
        for (const fy of [0.03, 0.97, 0.5, 0.2, 0.8, 0.35, 0.65]) for (const fx of [0.04, 0.96, 0.5, 0.25, 0.75]) cands.push([Math.round(W * fx), Math.round(H * fy)]);
        for (const [x, y] of cands) {
            if (s.some((r) => x >= r.left - 8 && x <= r.right + 8 && y >= r.top - 8 && y <= r.bottom + 8)) continue;
            const e = document.elementFromPoint(x, y);
            if (!e) continue;
            if (e.closest("button,a,input,textarea,select,label,[role=button],[role=menu],[role=listbox],[role=option],[role=tab],[data-slot=select-content],.glass-dock,[contenteditable]")) continue;
            return [x, y];
        }
        return [4, 4];
    }, surf);
}

async function act(P, a, spec) {
    if (Array.isArray(a)) { for (const x of a) await act(P, x, spec); return; }
    const { page, c } = P;
    if (a.wait != null && !a.timeout) return void (await sleep(a.wait));
    if (a.tap) return void (await tap(P, a.tap));
    if (a.tapNth) {
        const [sel, n] = a.tapNth;
        const b = await page.evaluate(([s, n]) => { const l = [...document.querySelectorAll(s)]; const e = l[Math.min(n, l.length - 1)]; if (!e) return null; e.scrollIntoView({ block: "nearest" }); const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, [sel, n]);
        if (!b) throw new Error("no " + sel);
        return void (await tapAt(P, ...b));
    }
    if (a.tapText) {
        const b = await page.evaluate((t) => { const e = [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === t); if (!e) return null; e.scrollIntoView({ block: "center" }); const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, a.tapText);
        if (!b) throw new Error("no text " + a.tapText);
        return void (await tapAt(P, ...b));
    }
    if (a.tapVisible) {
        const b = await page.evaluate((s) => { const e = [...document.querySelectorAll(s)].find((x) => { const r = x.getBoundingClientRect(); return r.width && r.height && getComputedStyle(x).visibility !== "hidden"; }); if (!e) return null; const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, a.tapVisible);
        if (!b) throw new Error("no visible " + a.tapVisible);
        return void (await tapAt(P, ...b));
    }
    if (a.tapExpand) { const b = await box(P, a.tapExpand); return void (await tapAt(P, b.cx, b.cy)); }
    if (a.key) return void (await page.keyboard.press(a.key));
    if (a.outside) { const [x, y] = await outsidePoint(P, spec.surf); P.note = `outside at ${x},${y}`; return void (await tapAt(P, x, y)); }
    if (a.hoverOrTap) {
        if (c.touch) return void (await tap(P, a.hoverOrTap));
        const b = await box(P, a.hoverOrTap);
        await page.mouse.move(b.cx - 30, b.cy + 60);
        await page.mouse.move(b.cx, b.cy, { steps: 4 });
        return;
    }
    if (a.hover) { const b = await box(P, a.hover); return void (await page.mouse.move(b.cx, b.cy, { steps: 4 })); }
    if (a.leave) {
        if (c.touch) throw new Error("SKIP: no hover leave on touch");
        return void (await page.mouse.move(4, 4, { steps: 6 }));
    }
    if (a.focusOut) {
        return void (await page.evaluate(() => { let b = document.getElementById("__exfocus"); if (!b) { b = document.createElement("button"); b.id = "__exfocus"; b.textContent = "x"; b.style.cssText = "position:fixed;left:0;bottom:0;width:4px;height:4px;opacity:0"; document.body.appendChild(b); } b.focus(); }));
    }
    if (a.ctx) {
        const b = await box(P, a.ctx);
        if (!c.touch) return void (await page.mouse.click(b.cx, b.cy, { button: "right" }));
        if (!P.cdp) throw new Error("SKIP: no long-press in WebKit Playwright");
        await P.cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: b.cx, y: b.cy, id: 1 }] });
        await sleep(900);
        await P.cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        return;
    }
    if (a.subOpen || a.subAway || a.subPick) {
        const subT = "[data-slot=menu-sub-trigger]";
        if (a.subOpen) {
            const b = await box(P, subT);
            if (!b) throw new Error("no sub trigger");
            if (c.touch) await tapAt(P, b.cx, b.cy);
            else { await page.mouse.move(b.cx - 20, b.cy, { steps: 3 }); await page.mouse.move(b.cx, b.cy, { steps: 3 }); }
            return;
        }
        if (a.subAway) {
            // another item of the parent menu
            const b = await page.evaluate(() => { const m = document.querySelector("[data-reveal=menu][role=menu]"); const e = m && [...m.querySelectorAll("[role=menuitem]:not([aria-haspopup])")][0]; if (!e) return null; const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
            if (!b) throw new Error("no parent item");
            if (c.touch) throw new Error("SKIP: parent-item hover is a pointer route");
            await page.mouse.move(b[0], b[1], { steps: 5 });
            return;
        }
        if (a.subPick) {
            const b = await page.evaluate(() => { const ms = [...document.querySelectorAll("[role=menu]")]; const m = ms[ms.length - 1]; const e = m && m.querySelector("[role=menuitem],[role=menuitemradio],[role=menuitemcheckbox]"); if (!e) return null; const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
            if (!b) throw new Error("no sub item");
            if (!c.touch) await page.mouse.move(b[0] - 10, b[1], { steps: 4 });
            return void (await tapAt(P, ...b));
        }
    }
    if (a.swipe) {
        const r = await box(P, spec.surf);
        if (!r) throw new Error("no surface to swipe");
        const d = 260;
        const m = {
            right: [[r.x + 40, r.cy], [r.x + 40 + d, r.cy]],
            left: [[r.x + r.w - 40, r.cy], [r.x + r.w - 40 - d, r.cy]],
            bottom: [[r.cx, r.y + 14], [r.cx, r.y + 14 + d]],
            top: [[r.cx, r.y + r.h - 14], [r.cx, r.y + r.h - 14 - d]],
        }[a.swipe];
        P.note = "swipe by " + (await swipe(P, m[0], m[1]));
        return;
    }
    if (a.eval) { const ok = await page.evaluate(a.eval); if (ok === false) throw new Error("eval found nothing"); return; }
    if (a.timeout) return;
    throw new Error("unknown action " + JSON.stringify(a));
}

const SETTLE = 1300;
async function openAndRead(P, spec) {
    await gotoComp(P, tree, spec.page);
    if (spec.id === "dock-collapse") { await act(P, { outside: true }, spec); await sleep(1200); }
    else if (spec.before) { await act(P, spec.before, spec); await sleep(400); }
    await rec(P, { s: spec.surf });
    await mark(P, "open");
    await act(P, spec.open, spec);
    await sleep(spec.id === "toast" ? 900 : SETTLE);
}

async function runSpec(P, spec) {
    const R = { routes: {}, errors: [] };
    // ENTER + GLASS, on a load of its own
    try {
        await openAndRead(P, spec);
        R.glass = await P.page.evaluate((s) => window.__ex.glass(s), spec.surf);
        const res = await stop(P);
        R.enter = readMotion(res, "s", "open", spec.inPlace ? "inplace" : "enter");
        saveRows(`${tag}/${spec.id}.enter`, res);
    } catch (e) { R.errors.push("enter: " + String(e.message || e).slice(0, 200)); }
    if (mode === "glass") return R;
    let routes = Object.entries(spec.routes);
    if (mode === "first2") routes = routes.slice(0, 2);
    for (const [name, action] of routes) {
        try {
            await openAndRead(P, spec);
            P.note = "";
            await mark(P, "leave");
            await act(P, action, spec);
            if (action.timeout) {
                const t0 = Date.now();
                while (Date.now() - t0 < 12000) { const n = await P.page.evaluate((s) => document.querySelectorAll(s).length, spec.surf); if (!n) break; await sleep(200); }
                await sleep(400);
            } else await sleep(1400);
            const res = await stop(P);
            const m = readMotion(res, "s", "leave", spec.inPlace ? "inplace" : "leave");
            if (P.note) m.note = P.note;
            R.routes[name] = m;
            saveRows(`${tag}/${spec.id}.${name}`, res);
        } catch (e) {
            const msg = String(e.message || e);
            R.routes[name] = msg.startsWith("SKIP") ? { verdict: "n/a", note: msg.slice(6) } : { verdict: "ERR", note: msg.slice(0, 200) };
            try { await stop(P); } catch (_) {}
        }
    }
    // REVERSE: dismiss by Escape, reopen 60 ms later; read whether the surface turns where it is.
    if (spec.reverse && mode === "full") {
        try {
            await openAndRead(P, spec);
            await mark(P, "leave");
            await P.page.keyboard.press("Escape");
            await sleep(60);
            await mark(P, "rev");
            await act(P, spec.reverse, spec);
            await sleep(1400);
            const res = await stop(P);
            const rows = res.rows;
            const i0 = rows.findIndex((r) => (r.m || "").includes("leave"));
            const seg = rows.slice(i0).map((r) => (r.s ? r.s.eop : null));
            const absent = seg.some((v) => v == null);
            let jump = 0;
            for (let k = 1; k < seg.length; k++) if (seg[k] != null && seg[k - 1] != null) jump = Math.max(jump, Math.abs(seg[k] - seg[k - 1]));
            const minOp = Math.min(...seg.filter((v) => v != null));
            const endOp = seg[seg.length - 1];
            R.reverse = { absentMidway: absent, minOp, endOp, maxFrameStep: +jump.toFixed(3), verdict: endOp == null || endOp < 0.5 ? "reopen ignored" : absent ? "restarts (unmounted between)" : jump > 0.3 ? "jumps" : "turns", op: seg.slice(0, 40) };
            saveRows(`${tag}/${spec.id}.reverse`, res);
        } catch (e) { R.errors.push("reverse: " + String(e.message || e).slice(0, 200)); }
    }
    return R;
}

await withBrowser(engine, async (browser) => {
    for (const spec of specs) {
        const t0 = Date.now();
        await cell(browser, engine, C, async (P) => {
            out.surfaces[spec.id] = await runSpec(P, spec);
            out.surfaces[spec.id].pageErrors = P.errors.slice(0, 5);
        }).catch((e) => { out.surfaces[spec.id] = { fatal: String(e).slice(0, 300) }; });
        const r = out.surfaces[spec.id];
        console.log(`${spec.id} ${((Date.now() - t0) / 1000).toFixed(1)}s enter=${r.enter?.verdict}/${r.enter?.ms} ` + Object.entries(r.routes || {}).map(([k, v]) => `${k}=${v.verdict}/${v.ms ?? ""}`).join(" ") + (r.reverse ? ` rev=${r.reverse.verdict}` : "") + (r.errors?.length ? " ERR " + r.errors.join("; ") : "") + (r.fatal ? " FATAL " + r.fatal : ""));
        saveJson(`logs/results/${tag}.${mode}.json`, out);
    }
});
