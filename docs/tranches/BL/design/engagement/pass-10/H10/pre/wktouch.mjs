// wktouch.mjs · H-4: touch input in Playwright's WebKit build that Playwright's API does not expose.
// Playwright's WebKit touchscreen sends `Input.dispatchTapEvent` only (a tap: down and up at once), so a HELD touch and
// a touch DRAG have no input through it. The same WebKit build's inspector protocol carries `Input.dispatchTouchEvent`
// (touchStart / touchMove / touchEnd with touch points), which sets `:active` under touch and holds it until touchEnd,
// with a sticky `:hover` as in Chromium (measured, pass-1 RH.md §2 H-4). This module launches that build
// (`pw.webkit.executablePath()`, the binary Playwright itself launches) over its own `--inspector-pipe` and drives one
// page per context: navigate, evaluate, a fine mouse move, and touch points. It is the WebKit half of lib.mjs's
// `openTouchPage`; Chromium's half is CDP. **Playwright WebKit is not Safari.**
//
// Protocol (the one Playwright's own WebKit driver speaks; NUL-delimited JSON on fds 3 and 4):
//   browser: Playwright.enable, Playwright.createContext, Playwright.createPage → pageProxyId, Playwright.navigate
//   page proxy (pageProxyId on the message): Input.dispatchTouchEvent, Input.dispatchMouseEvent,
//     Emulation.setDeviceMetricsOverride, Target.sendMessageToTarget (wraps a page-target message)
//   page target: Page.setTouchEmulationEnabled, Page.overrideUserPreference (PrefersReducedMotion,
//     PrefersColorScheme), Page.getResourceTree, Runtime.evaluate
import { holdWebkit } from "../../../driver/webkit-lock.mjs";
import { spawn } from "node:child_process";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export class WkTouch {
  constructor(executablePath) { this.exe = executablePath; this.p = null; this.id = 0; this.tid = 0; this.pend = new Map(); this.events = []; this.dead = null; }
  get alive() { return !!this.p && !this.dead; }
  async launch() {
    if (this.alive) return;
    await holdWebkit();
    this.dead = null; this.events = []; this.pend = new Map();
    const p = spawn(this.exe, ["--inspector-pipe", "--headless", "--no-startup-window"], { stdio: ["ignore", "ignore", "ignore", "pipe", "pipe"] });
    this.p = p; let buf = "";
    p.stdio[4].on("data", (d) => {
      buf += d.toString(); let i;
      while ((i = buf.indexOf("\0")) >= 0) {
        const m = JSON.parse(buf.slice(0, i)); buf = buf.slice(i + 1);
        if (m.id && this.pend.has(m.id)) { this.pend.get(m.id)(m); this.pend.delete(m.id); continue; }
        if (m.method === "Target.dispatchMessageFromTarget") {
          const inner = JSON.parse(m.params.message);
          if (inner.id && this.pend.has(`t${inner.id}`)) { this.pend.get(`t${inner.id}`)(inner); this.pend.delete(`t${inner.id}`); } else this.events.push({ ...inner, pageProxyId: m.pageProxyId });
          continue;
        }
        this.events.push(m);
      }
    });
    // only the CURRENT process may mark the driver dead: a killed process exits after its successor has launched
    const die = (why) => { if (this.p !== p || this.dead) return; this.dead = why; for (const [, ok] of this.pend) ok({ error: { message: `Browser closed (raw WebKit: ${why})` } }); this.pend.clear(); };
    p.on("exit", (c, s) => die(`exit ${c ?? s}`)); p.stdio[3].on("error", () => die("pipe error"));
    await this.send("Playwright.enable");
  }
  send(method, params = {}, extra = {}) {
    if (this.dead) return Promise.reject(new Error(`Browser closed (raw WebKit: ${this.dead})`));
    return new Promise((ok, no) => {
      const n = ++this.id;
      this.pend.set(n, (m) => (m.error ? no(new Error(`${method}: ${m.error.message}`)) : ok(m.result ?? {})));
      this.p.stdio[3].write(JSON.stringify({ id: n, method, params, ...extra }) + "\0");
    });
  }
  /** A message to the page's current target, wrapped through the page proxy. */
  tsend(pp, targetId, method, params = {}) {
    if (this.dead) return Promise.reject(new Error(`Browser closed (raw WebKit: ${this.dead})`));
    return new Promise((ok, no) => {
      const n = ++this.tid;
      this.pend.set(`t${n}`, (m) => (m.error ? no(new Error(`${method}: ${m.error.message}`)) : ok(m.result ?? {})));
      this.send("Target.sendMessageToTarget", { targetId, message: JSON.stringify({ id: n, method, params }) }, { pageProxyId: pp }).catch(no);
    });
  }
  target(pp) { return [...this.events].reverse().find((e) => e.method === "Target.targetCreated" && e.pageProxyId === pp && e.params?.targetInfo?.type === "page")?.params.targetInfo.targetId; }
  /**
   * Open a page: { vp {width,height}, prm, theme, init (a function source installed after load) }. Returns
   * { page: { evaluate(fn, arg), waitForTimeout(ms) }, touch(type, x, y), mouseMove(x, y), close() }.
   */
  async open(url, o = {}) {
    await this.launch();
    const { browserContextId: bc } = await this.send("Playwright.createContext", {});
    const { pageProxyId: pp } = await this.send("Playwright.createPage", { browserContextId: bc });
    let t; for (let k = 0; k < 100 && !(t = this.target(pp)); k++) await wait(20);
    if (!t) throw new Error("raw WebKit: no page target");
    const vp = o.vp ?? { width: 700, height: 500 };
    await this.send("Emulation.setDeviceMetricsOverride", { width: vp.width, height: vp.height, fixedLayout: false, deviceScaleFactor: 1 }, { pageProxyId: pp });
    const prefs = async (tt) => {
      await this.tsend(pp, tt, "Page.setTouchEmulationEnabled", { enabled: true });
      await this.tsend(pp, tt, "Page.overrideUserPreference", { name: "PrefersReducedMotion", value: o.prm ? "Reduce" : "NoPreference" });
      await this.tsend(pp, tt, "Page.overrideUserPreference", { name: "PrefersColorScheme", value: o.theme === "dark" ? "Dark" : "Light" });
    };
    await prefs(t);
    const tree = await this.tsend(pp, t, "Page.getResourceTree");
    const before = this.events.length;
    await this.send("Playwright.navigate", { url, pageProxyId: pp, frameId: tree.frameTree.frame.id });
    // a navigation may swap the page's process: a new target arrives, and the emulation is re-applied to it
    for (let k = 0; k < 50; k++) { await wait(40); if (this.events.slice(before).some((e) => e.pageProxyId === pp && (e.method === "Target.targetCreated" || e.method === "Page.loadEventFired"))) break; }
    const t2 = this.target(pp); if (t2 !== t) { t = t2; await prefs(t); }
    const evaluate = async (fn, arg) => {
      // WebKit's Runtime.evaluate does not await: the value is wrapped in a promise of its JSON, and Runtime.awaitPromise
      // returns that by value (sync and async functions alike)
      const call = typeof fn === "function" ? `(${fn})(${arg === undefined ? "" : JSON.stringify(arg)})` : String(fn);
      const r = await this.tsend(pp, t, "Runtime.evaluate", { expression: `Promise.resolve(${call}).then((v) => JSON.stringify(v === undefined ? null : v))`, returnByValue: false });
      if (r.wasThrown) throw new Error(`raw WebKit evaluate: ${r.result?.description ?? "threw"}`);
      const z = await this.tsend(pp, t, "Runtime.awaitPromise", { promiseObjectId: r.result.objectId, returnByValue: true });
      if (z.wasThrown) throw new Error(`raw WebKit evaluate: ${z.result?.description ?? "rejected"}`);
      return JSON.parse(z.result.value);
    };
    if (o.init) await evaluate(`(${o.init})()`);
    return {
      pp, page: { evaluate, waitForTimeout: wait },
      touch: (type, x, y) => this.send("Input.dispatchTouchEvent", { type, modifiers: 0, touchPoints: [{ x: Math.round(x), y: Math.round(y) }] }, { pageProxyId: pp }),
      // H2 (CK-25's coarse frames in WebKit): a viewport-space snapshot of a clip, PNG bytes, from the page target
      shot: async (c) => { const r = await this.tsend(pp, t, "Page.snapshotRect", { x: Math.round(c.x), y: Math.round(c.y), width: Math.round(c.width), height: Math.round(c.height), coordinateSystem: "Viewport" }); return Buffer.from(String(r.dataURL).split(",")[1], "base64"); },
      mouseMove: (x, y) => this.send("Input.dispatchMouseEvent", { type: "move", x: Math.round(x), y: Math.round(y), modifiers: 0, button: "none", buttons: 0, clickCount: 0 }, { pageProxyId: pp }),
      close: () => this.send("Playwright.deleteContext", { browserContextId: bc }).catch(() => {}),
    };
  }
  async kill() { const p = this.p; this.p = null; if (p && !this.dead) { try { p.stdio[3].write(JSON.stringify({ id: -9999, method: "Playwright.close" }) + "\0"); } catch {} await wait(200); try { p.kill("SIGKILL"); } catch {} } this.dead = null; }
}
