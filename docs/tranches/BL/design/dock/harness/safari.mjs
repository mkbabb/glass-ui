// safari.mjs · H-8, the real-Safari target (safaridriver, plain W3C WebDriver over HTTP).
//
//   node safari.mjs                      print the target's status (exit 0 when enabled)
//   node <witness>.mjs … --engine safari run a witness in real Safari (via launch("safari"))
//
// Safari refuses WebDriver sessions until the owner ticks Settings → Developer → "Allow
// remote automation" (a GUI checkbox; no tool call can tick it). Until then every Safari
// cell reports UNMEASURED (owner's safaridriver checkbox) with safaridriver's own message.
//
// Once enabled, launchSafari() returns a browser object with the subset of Playwright's
// page API the witnesses call: newContext/newPage, goto, evaluate, addInitScript (replayed
// after navigation; the adapter config also rides the URL as ?hpcfg=), waitForFunction,
// waitForTimeout, screenshot({clip}) (the viewport PNG, cropped), mouse.move/click,
// keyboard.press, viewportSize/setViewportSize, close. What WebDriver cannot give it
// throws, and the witness records that cell as not measured: touch (coarse cells),
// reducedMotion emulation, deviceScaleFactor (Safari paints at the display's scale),
// recordVideo (Safari's screenshot does not complete transitions the way Playwright
// WebKit's does, which is itself an open question: REGISTRY §5 owner actions).
//
// SERIALIZATION (S-4): Safari allows one automation session. The target takes a lock file
// in the OS temp dir and refuses to start while another harness process holds it or while
// the 1-minute load average is above DOCK_SAFARI_MAX_LOAD (default 8).
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { decodePng, HP_SRC, PNG } from "./lib.mjs";
import { pathToFileURL } from "node:url";

const PORT = Number(process.env.DOCK_SAFARI_PORT ?? 4459);
const LOCK = path.join(os.tmpdir(), "dock-harness-safari.lock");
const MAX_LOAD = Number(process.env.DOCK_SAFARI_MAX_LOAD ?? 8);
export const UNMEASURED = "UNMEASURED (owner's safaridriver checkbox)";

async function wd(method, url, body) {
    const r = await fetch(`http://127.0.0.1:${PORT}${url}`, { method, headers: { "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
    const j = await r.json().catch(() => ({}));
    if (j?.value?.error) throw new Error(`${j.value.error}: ${j.value.message}`);
    return j.value;
}
async function startDriver() {
    const p = spawn("safaridriver", ["-p", String(PORT)], { stdio: "ignore" });
    for (let k = 0; k < 40; k++) { try { await fetch(`http://127.0.0.1:${PORT}/status`); return p; } catch { await new Promise((r) => setTimeout(r, 100)); } }
    p.kill(); throw new Error("safaridriver did not start");
}
/** The target's status: { enabled, why, safari, macos }. Never leaves a session open. */
export async function safariStatus() {
    const info = { safari: null, macos: os.release() };
    try { info.safari = fs.readFileSync("/Applications/Safari.app/Contents/Info.plist", "utf8").match(/CFBundleShortVersionString<\/key>\s*<string>([^<]+)/)?.[1] ?? null; } catch { }
    let drv;
    try { drv = await startDriver(); } catch (e) { return { ...info, enabled: false, why: `safaridriver unavailable: ${e.message}` }; }
    try {
        const s = await wd("POST", "/session", { capabilities: { alwaysMatch: { browserName: "safari" } } });
        await wd("DELETE", `/session/${s.sessionId}`);
        return { ...info, enabled: true, why: "a WebDriver session opened and closed" };
    } catch (e) { return { ...info, enabled: false, why: e.message }; }
    finally { drv.kill(); }
}

const KEYS = { Tab: "\uE004", Shift: "\uE008", Alt: "\uE00A", ArrowRight: "\uE014", ArrowDown: "\uE015", ArrowLeft: "\uE012", ArrowUp: "\uE013", Enter: "\uE007", Escape: "\uE00C" };
class Page {
    constructor(sid, ctx) { this.sid = sid; this.ctx = ctx; this.inits = []; this.vp = ctx.viewport ?? { width: 1440, height: 900 }; this.mouse = { move: (x, y) => this.#pointer([{ type: "pointerMove", x: Math.round(x), y: Math.round(y), origin: "viewport", duration: 0 }]), click: (x, y) => this.#pointer([{ type: "pointerMove", x: Math.round(x), y: Math.round(y), origin: "viewport", duration: 0 }, { type: "pointerDown", button: 0 }, { type: "pointerUp", button: 0 }]) }; this.keyboard = { press: (k) => { const ks = k.split("+").map((x) => KEYS[x] ?? x); return wd("POST", `/session/${this.sid}/actions`, { actions: [{ type: "key", id: "kb", actions: [...ks.map((v) => ({ type: "keyDown", value: v })), ...ks.reverse().map((v) => ({ type: "keyUp", value: v }))] }] }); } }; this.touchscreen = { tap: () => { throw new Error("touch is not available through safaridriver"); } }; }
    #pointer(actions) { return wd("POST", `/session/${this.sid}/actions`, { actions: [{ type: "pointer", id: "mouse", parameters: { pointerType: "mouse" }, actions }] }); }
    on() { }
    async addInitScript(src) { this.inits.push(src); }
    async goto(url) {
        const cfg = this.inits.map((s) => /window\.__dockAdapterConfig = (.*);$/.exec(s)?.[1]).find(Boolean);
        const u = new URL(url); if (cfg) u.searchParams.set("hpcfg", cfg);
        await wd("POST", `/session/${this.sid}/url`, { url: u.href });
        for (const s of this.inits) if (!s.includes("__dockAdapterConfig")) await this.evaluate(s);
    }
    async evaluate(fn, arg) {
        const body = typeof fn === "string" ? `const done = arguments[arguments.length - 1]; try { done({ ok: (0, eval)(${JSON.stringify(fn)}) ?? null }); } catch (e) { done({ err: String(e) }); }`
            : `const done = arguments[arguments.length - 1]; Promise.resolve((${fn.toString()})(arguments[0])).then((v) => done({ ok: v === undefined ? null : v }), (e) => done({ err: String(e) }));`;
        const r = await wd("POST", `/session/${this.sid}/execute/async`, { script: body, args: [arg ?? null] });
        if (r?.err) throw new Error(r.err);
        return r?.ok;
    }
    async waitForFunction(fn, arg, { timeout = 20000 } = {}) { const t0 = Date.now(); for (;;) { if (await this.evaluate(fn, arg)) return; if (Date.now() - t0 > timeout) throw new Error("waitForFunction timed out"); await new Promise((r) => setTimeout(r, 50)); } }
    waitForTimeout(ms) { return new Promise((r) => setTimeout(r, ms)); }
    viewportSize() { return this.vp; }
    async setViewportSize(vp) { this.vp = vp; await wd("POST", `/session/${this.sid}/window/rect`, { width: vp.width, height: vp.height + 80 }); }
    async screenshot({ clip } = {}) {
        const b64 = await wd("GET", `/session/${this.sid}/screenshot`);
        const buf = Buffer.from(b64, "base64");
        if (!clip) return buf;
        const img = decodePng(buf); const d = img.w / this.vp.width;
        const w = Math.round(clip.width * d), h = Math.round(clip.height * d), x0 = Math.round(clip.x * d), y0 = Math.round(clip.y * d);
        const out = new PNG({ width: w, height: h });
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const si = ((y0 + y) * img.w + (x0 + x)) * 4, di = (y * w + x) * 4; for (let c = 0; c < 4; c++) out.data[di + c] = img.data[si + c] ?? 255; }
        return PNG.sync.write(out);
    }
    locator() { return { first: () => ({ ariaSnapshot: () => { throw new Error("ariaSnapshot is not available through safaridriver"); } }) }; }
    video() { throw new Error("recordVideo is not available through safaridriver"); }
}
/** Launch real Safari, or throw with the UNMEASURED reason. */
export async function launchSafari() {
    const st = await safariStatus();
    if (!st.enabled) throw new Error(`${UNMEASURED}: ${st.why}`);
    if (os.loadavg()[0] > MAX_LOAD) throw new Error(`Safari not run: load ${os.loadavg()[0].toFixed(2)} > ${MAX_LOAD}; Safari cells run serialized, never beside other harness load (S-4)`);
    if (fs.existsSync(LOCK)) throw new Error(`Safari not run: another harness process holds ${LOCK}`);
    fs.writeFileSync(LOCK, String(process.pid));
    const drv = await startDriver();
    let session = null;
    const browser = {
        __engine: "safari",
        async newContext(ctx = {}) {
            for (const k of ["hasTouch", "isMobile", "reducedMotion", "recordVideo"]) if (ctx[k]) throw new Error(`safaridriver cannot emulate ${k}`);
            if (session) throw new Error("Safari allows one automation session at a time");
            const s = await wd("POST", "/session", { capabilities: { alwaysMatch: { browserName: "safari" } } });
            session = s.sessionId;
            const vp = ctx.viewport ?? { width: 1440, height: 900 };
            await wd("POST", `/session/${session}/window/rect`, { x: 0, y: 0, width: vp.width, height: vp.height + 80 });
            const page = new Page(session, ctx);
            page.evaluate(HP_SRC).catch(() => { });
            return { newPage: async () => page, close: async () => { await wd("DELETE", `/session/${session}`).catch(() => { }); session = null; } };
        },
        async close() { if (session) await wd("DELETE", `/session/${session}`).catch(() => { }); drv.kill(); fs.rmSync(LOCK, { force: true }); },
    };
    return browser;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    const st = await safariStatus();
    console.log(`${st.enabled ? "ENABLED" : UNMEASURED}  Safari ${st.safari ?? "?"} (Darwin ${st.macos}): ${st.why}`);
    process.exitCode = st.enabled ? 0 : 1;
}
