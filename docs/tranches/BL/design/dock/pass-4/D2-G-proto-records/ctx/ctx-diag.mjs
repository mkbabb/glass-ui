// ctx-diag.mjs — G obligation 5: why Chromium rejects W3 `retarget·context`'s awaited evaluate.
// One Chromium browser, a fresh context per variant; a CDP session records every execution
// context created/destroyed/cleared and every frame event while the variant's evaluate runs.
//   node ctx-diag.mjs --build <dir> --adapter <adapter.mjs> [--out <json>]
import fs from "node:fs";
import { parseArgs, openTarget, launch, openScene } from "../../../harness/lib.mjs";
const args = parseArgs();
const target = await openTarget(args);
const LONG = () => { window.__scene.setFace("long"); return 1; };
const MID = () => { window.__scene.setFace("mid"); return 1; };
const AWAIT = async () => { await new Promise((f) => setTimeout(f, 80)); return 1; };
const AWAIT_MID = async () => { await new Promise((f) => setTimeout(f, 80)); window.__scene.setFace("mid"); return 1; };
const TRACE_ON = () => {
    const t = (window.__trace = { on: false, n: {} });
    const wrap = (obj, key, label) => { const f = obj[key]; if (typeof f !== "function") return; obj[key] = function (...a) { if (t.on) { const k = label + (key === "setAttribute" || key === "removeAttribute" || key === "toggleAttribute" ? ":" + a[0] : key === "setProperty" ? ":" + a[0] : ""); t.n[k] = (t.n[k] ?? 0) + 1; } return f.apply(this, a); }; };
    for (const k of ["animate", "focus", "blur", "setAttribute", "removeAttribute", "toggleAttribute", "getBoundingClientRect", "getAnimations", "attachShadow", "setPointerCapture", "releasePointerCapture", "requestFullscreen", "scrollTo", "scrollIntoView", "showPopover", "hidePopover", "remove", "append", "replaceWith", "insertBefore", "appendChild", "removeChild"]) { wrap(Element.prototype, k, "El." + k); wrap(Node.prototype, k, "Node." + k); wrap(HTMLElement.prototype, k, "HEl." + k); }
    for (const k of ["setProperty", "removeProperty"]) wrap(CSSStyleDeclaration.prototype, k, "style." + k);
    for (const k of ["cancel", "play", "pause", "finish", "commitStyles", "persist", "reverse", "updatePlaybackRate"]) wrap(Animation.prototype, k, "Anim." + k);
    for (const k of ["getComputedStyle", "setTimeout", "clearTimeout", "requestAnimationFrame", "cancelAnimationFrame", "queueMicrotask", "dispatchEvent", "addEventListener", "removeEventListener", "postMessage"]) wrap(window, k, "win." + k);
    for (const k of ["createElement", "elementFromPoint", "elementsFromPoint", "addEventListener", "removeEventListener", "dispatchEvent"]) wrap(document, k, "doc." + k);
    wrap(HTMLCanvasElement.prototype, "getContext", "canvas.getContext");
    wrap(EventTarget.prototype, "dispatchEvent", "ET.dispatchEvent");
    wrap(EventTarget.prototype, "addEventListener", "ET.addEventListener");
    return 1;
};
const VARIANTS = {
    // the cell as W3 runs it
    "cell": [LONG, AWAIT_MID],
    // the awaited evaluate with no retarget in it
    "await-only": [LONG, AWAIT],
    // the retarget from a synchronous evaluate (no await in the page)
    "sync-retarget": [LONG, AWAIT, MID],
    // one evaluate that awaits, no prior episode
    "await-at-rest": [AWAIT_MID],
    // the cell, the retarget's throw (if any) caught in the page and returned
    "cell-caught": [LONG, async () => { await new Promise((f) => setTimeout(f, 80)); try { window.__scene.setFace("mid"); return "ok"; } catch (e) { return "THREW " + (e?.constructor?.name ?? typeof e) + ": " + String(e?.message ?? e).slice(0, 200) + " | " + String(e?.stack ?? "").split("\n").slice(0, 6).join(" / "); } }],
    // the cell, the evaluate's own promise returning a tick after the retarget
    "cell-tick": [LONG, async () => { await new Promise((f) => setTimeout(f, 80)); window.__scene.setFace("mid"); await new Promise((f) => setTimeout(f, 0)); return 1; }],
    // no retarget: the continuation allocates (a young-generation GC inside it) and returns
    "alloc": [async () => { await new Promise((f) => setTimeout(f, 80)); let a = []; for (let i = 0; i < 400000; i++) a.push({ i, s: "x" + i }); a = null; return 1; }],
    // no retarget: the continuation queues the allocation as a microtask (where Vue's flush runs
    // the retarget's work) and returns, so the GC lands between the return and the reply
    "alloc-micro": [async () => { await new Promise((f) => setTimeout(f, 80)); queueMicrotask(() => { let a = []; for (let i = 0; i < 400000; i++) a.push({ i, s: "x" + i }); a = null; }); return 1; }],
    "alloc-micro-small": [async () => { await new Promise((f) => setTimeout(f, 80)); queueMicrotask(() => { let a = []; for (let i = 0; i < 20000; i++) a.push({ i, s: "x" + i }); a = null; }); return 1; }],
    // bisect: the live episode's animations cancelled from the continuation, no retarget
    "cancel-only": [LONG, async () => { await new Promise((f) => setTimeout(f, 80)); const n = document.getAnimations().length; for (const a of document.getAnimations()) a.cancel(); return n; }],
    // bisect: the cell with Animation.cancel made a no-op for the retarget
    "cell-nocancel": [LONG, async () => { await new Promise((f) => setTimeout(f, 80)); const c = Animation.prototype.cancel; Animation.prototype.cancel = function () { }; try { window.__scene.setFace("mid"); } finally { Animation.prototype.cancel = c; } return 1; }],
    // bisect: cancel animations started in this same continuation (fresh, never painted)
    "cancel-fresh": [async () => { await new Promise((f) => setTimeout(f, 80)); const as = [...document.querySelectorAll(".glass-dock *")].map((el) => el.animate([{ opacity: 1 }, { opacity: 0.5 }], { duration: 200 })); for (const a of as) a.cancel(); return as.length; }],
    // the cell with its timer id recorded and every clearTimeout call logged: is the evaluate's own
    // timer cancelled (its promise then never settles and is collected)?
    "cell-timers": [LONG, () => { window.__cleared = []; const c = window.clearTimeout; window.clearTimeout = function (id) { window.__cleared.push(id); return c.call(window, id); }; return 1; }, async () => { await new Promise((f) => { window.__tid = setTimeout(() => { window.__fired = true; f(); }, 80); }); window.__scene.setFace("mid"); window.__after = true; return 1; }, () => JSON.stringify({ tid: window.__tid, fired: !!window.__fired, after: !!window.__after, cleared: window.__cleared.slice(0, 20) })],
    // the cell, the evaluate's promise resolving one microtask after the retarget
    "cell-micro": [LONG, async () => { await new Promise((f) => setTimeout(f, 80)); window.__scene.setFace("mid"); await Promise.resolve(); return 1; }],
    // the cell with the DOM calls the retarget makes counted (read back by a later evaluate)
    "cell-trace": [LONG, TRACE_ON, async () => { await new Promise((f) => setTimeout(f, 80)); window.__trace.on = true; window.__scene.setFace("mid"); queueMicrotask(() => queueMicrotask(() => { window.__trace.on = false; })); return 1; }, () => JSON.stringify(window.__trace.n)],
    "trace-fv-reference": [LONG, TRACE_ON, async () => { await new Promise((f) => setTimeout(f, 80)); window.__trace.on = true; window.__scene.setFace("mid"); await new Promise((f) => setTimeout(f, 0)); window.__trace.on = false; return 1; }, () => JSON.stringify(window.__trace.n)],
    // bisect at rest, each DOM call the retarget makes, run in a microtask queued before the return
    "micro-animate": [async () => { await new Promise((f) => setTimeout(f, 80)); queueMicrotask(() => { for (const el of document.querySelectorAll(".glass-dock *")) el.animate([{ opacity: 1 }, { opacity: 0.99 }], { duration: 200 }); }); return 1; }],
    "micro-getAnimations": [async () => { await new Promise((f) => setTimeout(f, 80)); queueMicrotask(() => { document.querySelector(".glass-dock").getAnimations({ subtree: true }); }); return 1; }],
    "micro-layout": [async () => { await new Promise((f) => setTimeout(f, 80)); queueMicrotask(() => { const d = document.querySelector(".glass-dock"); d.style.setProperty("left", "1px"); d.getBoundingClientRect(); getComputedStyle(d).width; d.style.removeProperty("left"); }); return 1; }],
    "micro-attr": [async () => { await new Promise((f) => setTimeout(f, 80)); queueMicrotask(() => { const d = document.querySelector(".glass-dock"); d.setAttribute("data-x", ""); d.getBoundingClientRect(); d.removeAttribute("data-x"); }); return 1; }],
    "micro-timer": [async () => { await new Promise((f) => setTimeout(f, 80)); queueMicrotask(() => { clearTimeout(setTimeout(() => { }, 300)); setTimeout(() => { }, 300); }); return 1; }],
    // G's retarget shape with no G code: in a microtask queued before the return, cancel every
    // running animation, start 43 fill-both animations, read 17 rects and 31 computed styles
    "micro-shape": [LONG, async () => { await new Promise((f) => setTimeout(f, 80)); queueMicrotask(() => { for (const a of document.getAnimations()) a.cancel(); const els = [...document.querySelectorAll(".glass-dock, .glass-dock *")]; for (let i = 0; i < 43; i++) els[i % els.length].animate([{ translate: "0px" }, { translate: "3px" }], { duration: 250, fill: "both" }); for (let i = 0; i < 17; i++) els[i % els.length].getBoundingClientRect(); for (let i = 0; i < 31; i++) getComputedStyle(els[i % els.length]).width; }); return 1; }],
    "micro-shape-rest": [async () => { await new Promise((f) => setTimeout(f, 80)); queueMicrotask(() => { const els = [...document.querySelectorAll(".glass-dock, .glass-dock *")]; for (let i = 0; i < 43; i++) els[i % els.length].animate([{ translate: "0px" }, { translate: "3px" }], { duration: 250, fill: "both" }); for (let i = 0; i < 17; i++) els[i % els.length].getBoundingClientRect(); }); return 1; }],
    // bisect inside G: the cell with one API stubbed for the retarget's flush (restored after)
    ...Object.fromEntries([["animate", "Element.prototype", "animate", "() => ({ cancel() {}, finished: Promise.resolve() })"], ["setTimeout", "window", "setTimeout", "() => 0"], ["clearTimeout", "window", "clearTimeout", "() => {}"], ["setProperty", "CSSStyleDeclaration.prototype", "setProperty", "() => {}"], ["setAttribute", "Element.prototype", "setAttribute", "() => {}"], ["getAnimations", "Element.prototype", "getAnimations", "() => []"], ["measureText", "CanvasRenderingContext2D.prototype", "measureText", "() => ({ width: 8 })"], ["getBoundingClientRect", "Element.prototype", "getBoundingClientRect", "function () { return new DOMRect(0, 0, 10, 10); }"]].map(([k, obj, key, stub]) => ["stub-" + k, [LONG, new Function(`return async () => { await new Promise((f) => setTimeout(f, 80)); const o = ${obj}; const keep = o.${key}; const st = ${stub}; o.${key} = st; window.__scene.setFace("mid"); queueMicrotask(() => queueMicrotask(() => { o.${key} = keep; })); return 1; }`)()]])),
    // a full GC forced inside the continuation, and in a microtask after the return
    "gc-sync": [async () => { await new Promise((f) => setTimeout(f, 80)); if (typeof gc === "function") gc(); return typeof gc; }],
    "gc-micro": [async () => { await new Promise((f) => setTimeout(f, 80)); queueMicrotask(() => { if (typeof gc === "function") gc(); }); return typeof gc; }],
    // a full GC two microtasks after the return: after the evaluate's promise settles and before
    // the inspector's own reaction to it runs (the slot G's flip lands in, cell-micro and g15)
    "gc-slot": [async () => { await new Promise((f) => setTimeout(f, 80)); queueMicrotask(() => queueMicrotask(() => { if (typeof gc === "function") gc(); })); return typeof gc; }],
    "gc-slot3": [async () => { await new Promise((f) => setTimeout(f, 80)); queueMicrotask(() => queueMicrotask(() => queueMicrotask(() => { if (typeof gc === "function") gc(); }))); return typeof gc; }],
    "gc-micro-noawait": [() => { queueMicrotask(() => { if (typeof gc === "function") gc(); }); return Promise.resolve(typeof gc); }],
    // no retarget: the continuation starts WAAPI animations on every dock element and returns
    "waapi": [async () => { await new Promise((f) => setTimeout(f, 80)); for (const el of document.querySelectorAll(".glass-dock *")) el.animate([{ opacity: 1 }, { opacity: 0.99 }], { duration: 200 }); return 1; }],
    // no retarget: the continuation reads a canvas font metric (G's advanceOf)
    "canvas": [async () => { await new Promise((f) => setTimeout(f, 80)); const c = document.createElement("canvas").getContext("2d"); c.font = "500 14px sans-serif"; return c.measureText("0").width > 0 ? 1 : 0; }],
    // the retarget in the page, the evaluate returning before it (the scheduled form of retarget·80)
    "scheduled": [LONG, () => { setTimeout(() => window.__scene.setFace("mid"), 80); return 1; }, AWAIT],
};
const out = {};
// CTX_EXPOSE_GC=1: Chromium with `--js-flags=--expose-gc`, for the forced-GC variants
let browser;
if (process.env.CTX_EXPOSE_GC) {
    const { default: pw } = await import("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.js");
    browser = await pw.chromium.launch({ headless: true, args: ["--js-flags=--expose-gc"] });
    browser.__engine = "chromium";
} else browser = await launch("chromium");
try {
    for (const [name, steps] of Object.entries(VARIANTS)) {
        const s = await openScene(browser, target, "swap", { query: { three: "1" } });
        const ev = [];
        const t0 = Date.now();
        const cdp = await s.page.context().newCDPSession(s.page);
        await cdp.send("Runtime.enable");
        await cdp.send("Page.enable");
        const at = () => Date.now() - t0;
        cdp.on("Runtime.executionContextCreated", (e) => ev.push({ ms: at(), ev: "created", id: e.context.id, name: e.context.name, aux: e.context.auxData }));
        cdp.on("Runtime.executionContextDestroyed", (e) => ev.push({ ms: at(), ev: "destroyed", id: e.executionContextId, uid: e.executionContextUniqueId }));
        cdp.on("Runtime.executionContextsCleared", () => ev.push({ ms: at(), ev: "cleared" }));
        for (const k of ["Page.frameNavigated", "Page.frameAttached", "Page.frameDetached", "Page.navigatedWithinDocument", "Page.frameRequestedNavigation", "Page.documentOpened"]) cdp.on(k, (e) => ev.push({ ms: at(), ev: k, frame: e.frame?.id ?? e.frameId, url: (e.frame?.url ?? e.url ?? "").slice(-60) }));
        cdp.on("Runtime.exceptionThrown", (e) => ev.push({ ms: at(), ev: "exception", text: String(e.exceptionDetails?.exception?.description ?? e.exceptionDetails?.text).slice(0, 300) }));
        s.page.on("pageerror", (e) => ev.push({ ms: at(), ev: "pageerror", text: String(e).slice(0, 300) }));
        s.page.on("console", (m) => ev.push({ ms: at(), ev: "console", text: m.text().slice(0, 160) }));
        const res = [];
        if (name === "cell") {
            // the same awaited retarget sent as raw CDP, so the protocol's own error is read
            // (Playwright rewrites every non-JS protocol error to "Execution context was destroyed")
            // each pair: the episode (long), then the awaited retarget (mid), with and without
            // the user-gesture flag Playwright sends on every evaluate
            const go = (f) => `(async () => { await new Promise((f) => setTimeout(f, 80)); window.__scene.setFace("${f}"); return 1; })()`;
            const win = (await cdp.send("Runtime.evaluate", { expression: "window" })).result.objectId;
            const fn = `async function () { await new Promise((f) => setTimeout(f, 80)); window.__scene.setFace("mid"); return 1; }`;
            const held = `function () { const value = (${fn})(); window.__keep = value; const outer = (async () => { const v = await value; return v; })(); window.__keepOuter = outer; return outer; }`;
            const plain = `function () { const value = (${fn})(); return (async () => { const v = await value; return v; })(); }`;
            const order = process.env.CTX_ORDER === "held-first" ? [["raw-long", `window.__scene.setFace("long"), 1`, false], ["FIRST: wrapper, promises held by window", held, true, "cfo"], ["raw-long", `window.__scene.setFace("long"), 1`, false], ["SECOND: wrapper", plain, true, "cfo"]] : process.env.CTX_ORDER === "plain-first" ? [["raw-long", `window.__scene.setFace("long"), 1`, false], ["FIRST: wrapper", plain, true, "cfo"], ["raw-long", `window.__scene.setFace("long"), 1`, false], ["SECOND: wrapper", plain, true, "cfo"]] : null;
            for (const [label, expr, ug, how] of order ?? [["raw-long", `window.__scene.setFace("long"), 1`, false], ["raw-await-mid", go("mid"), false], ["raw-long", `window.__scene.setFace("long"), 1`, false], ["raw-await-mid+userGesture", go("mid"), true], ["raw-long", `window.__scene.setFace("long"), 1`, false], ["callFunctionOn", fn, false, "cfo"], ["raw-long", `window.__scene.setFace("long"), 1`, false], ["callFunctionOn+userGesture", fn, true, "cfo"], ["raw-long", `window.__scene.setFace("long"), 1`, false], ["callFunctionOn, Playwright's wrapper", `function () { const value = (${fn})(); return (async () => { const v = await value; return v; })(); }`, true, "cfo"], ["raw-long", `window.__scene.setFace("long"), 1`, false], ["callFunctionOn, Playwright's wrapper, promises held by window", `function () { const value = (${fn})(); window.__keep = value; const outer = (async () => { const v = await value; return v; })(); window.__keepOuter = outer; return outer; }`, true, "cfo"], ["raw-long", `window.__scene.setFace("long"), 1`, false], ["callFunctionOn, Playwright's wrapper (again)", `function () { const value = (${fn})(); return (async () => { const v = await value; return v; })(); }`, true, "cfo"], ["raw-long", `window.__scene.setFace("long"), 1`, false], ["callFunctionOn, Playwright's wrapper via eval", `function () { const value = globalThis.eval(${JSON.stringify("(" + fn + ")")})(); return (async () => { const v = await value; return v; })(); }`, true, "cfo"]]) {
                try { const r = how === "cfo" ? await cdp.send("Runtime.callFunctionOn", { functionDeclaration: expr, objectId: win, awaitPromise: true, returnByValue: true, userGesture: ug }) : await cdp.send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true, userGesture: ug }); res.push({ [label]: r.result?.value ?? r.result, exc: r.exceptionDetails?.exception?.description }); }
                catch (e) { res.push({ [label + " PROTOCOL-ERROR"]: String(e?.message ?? e).slice(0, 300) }); }
                await s.page.waitForTimeout(label === "raw-long" ? 0 : 600);
            }
            await s.page.waitForTimeout(600);
        }
        for (const src of steps) {
            try { res.push({ ok: await s.page.evaluate(src) }); }
            catch (e) { res.push({ err: String(e?.message ?? e).split("\n")[0].slice(0, 160) }); }
        }
        await s.page.waitForTimeout(400);
        const alive = await s.page.evaluate(() => 1).catch((e) => String(e).slice(0, 80));
        out[name] = { res, alive, ev };
        console.log(`${name}: ${JSON.stringify(res)} alive=${alive}`);
        for (const e of ev) console.log(`   ${String(e.ms).padStart(5)} ${e.ev} ${JSON.stringify(Object.fromEntries(Object.entries(e).filter(([k]) => k !== "ms" && k !== "ev")))}`);
        await cdp.detach().catch(() => { });
        await s.close();
    }
} finally {
    await browser.close();
    await target.close();
}
if (args.out) fs.writeFileSync(args.out, JSON.stringify(out, null, 1));
