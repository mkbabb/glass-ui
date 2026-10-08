// lib.mjs: the measurement floor for the D4 tile witnesses.
//
// A witness imports this file and measure.mjs. Everything here drives headless
// Chromium and Playwright WebKit with the same code. Playwright WebKit is the
// engine build Playwright ships; it is not Safari, and every WebKit number the
// harness prints is labelled "Playwright WebKit". Real Safari is reached only
// through safari.mjs (H-11), and only once the owner enables remote automation.
import { createRequire } from "node:module";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
/** The repository that holds this harness (docs/tranches/BL/design/tile/harness → repo). */
export const REPO = path.resolve(HERE, "../../../../../..");
const NM = process.env.TILE_HARNESS_NODE_MODULES ?? path.join(REPO, "node_modules");
const pw = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const requireNM = createRequire(path.join(NM, "_.cjs"));
const { PNG } = requireNM("pngjs");
export { PNG };

/**
 * H3-10 · the harness hash: sha256 over every `*.mjs` file in this directory, by name in order (name, NUL, bytes,
 * NUL), cut to 12 hex. Every run JSON records it (`harness.hash`), so two routes' tallies are comparable only when
 * their hashes match. Printed by every witness, by run.mjs and by tally.mjs.
 */
export const HARNESS = (() => {
  const h = createHash("sha256");
  const files = fs.readdirSync(HERE).filter((f) => f.endsWith(".mjs")).sort();
  for (const f of files) { h.update(f); h.update("\0"); h.update(fs.readFileSync(path.join(HERE, f))); h.update("\0"); }
  return { hash: h.digest("hex").slice(0, 12), files: files.length, rev: "H3" };
})();

export const DSF = 2;
export const VIEWPORT = { width: 1000, height: 900 };
const SETTLE_MS = 700;
export const ENGINE_LABEL = { chromium: "Chromium", webkit: "Playwright WebKit" };
export const SAFARI_CELL = "real Safari: UNMEASURED (owner's safaridriver checkbox)";

/**
 * Keyboard focus traversal per engine. Playwright WebKit follows the macOS default: Tab skips buttons and
 * Option+Tab reaches every focusable element (measured: Tab from a button lands on the next <input>, Alt+Tab on
 * the next button). Safari users without Full Keyboard Access traverse controls the same way. Every witness
 * that walks focus uses these keys, and a WebKit cell says so.
 */
export const KEYS = {
  chromium: { tab: "Tab", back: "Shift+Tab", note: "" },
  webkit: { tab: "Alt+Tab", back: "Alt+Shift+Tab", note: " (Option+Tab: Playwright WebKit's Tab skips buttons)" },
};

// ── load, other browsers, serialization (H-11) ───────────────────────────────
/** The 1/5/15-minute load average, printed beside every timing. */
export function load() { return os.loadavg().map((v) => v.toFixed(2)).join(" / "); }
/** Headless browser processes on this machine that this process did not start (other seats' harnesses). */
export function browserCensus() {
  let out = "";
  try { out = execFileSync("ps", ["-axo", "pid=,ppid=,command="], { encoding: "utf8", maxBuffer: 32 << 20 }); } catch { return { n: null, sample: [] }; }
  const mine = new Set([String(process.pid)]);
  const rows = out.split("\n").map((l) => l.trim().match(/^(\d+)\s+(\d+)\s+(.*)$/)).filter(Boolean);
  // descendants of this process are ours
  let grew = true;
  while (grew) { grew = false; for (const [, pid, ppid] of rows) if (mine.has(ppid) && !mine.has(pid)) { mine.add(pid); grew = true; } }
  const re = /(chrome-headless-shell|headless_shell|--headless|WebKitWebProcess|MiniBrowser|pw_run\.sh|WebKitNetworkProcess|safaridriver)/;
  const other = rows.filter(([, pid, , cmd]) => !mine.has(pid) && re.test(cmd) && !/\bps -axo\b/.test(cmd));
  return { n: other.length, sample: other.slice(0, 3).map(([, pid, , cmd]) => `${pid} ${cmd.slice(0, 80)}`) };
}
const LOCK = path.join(os.tmpdir(), "bl-d4-tile-harness.lock");
const alive = (pid) => { try { process.kill(pid, 0); return true; } catch { return false; } };
/** One harness process in the browser at a time: an exclusive lock directory, waited on, stale locks broken. */
export async function acquireLock(label, { maxWaitS = 3600 } = {}) {
  const t0 = Date.now();
  for (;;) {
    try { fs.mkdirSync(LOCK); fs.writeFileSync(path.join(LOCK, "owner"), `${process.pid} ${label}`); break; }
    catch {
      let owner = ""; try { owner = fs.readFileSync(path.join(LOCK, "owner"), "utf8"); } catch {}
      const pid = Number(owner.split(" ")[0]);
      if (!pid || !alive(pid)) { fs.rmSync(LOCK, { recursive: true, force: true }); continue; }
      if ((Date.now() - t0) / 1000 > maxWaitS) throw new Error(`browser lock held by ${owner} for ${maxWaitS} s`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  const release = () => { try { if (fs.readFileSync(path.join(LOCK, "owner"), "utf8").startsWith(String(process.pid))) fs.rmSync(LOCK, { recursive: true, force: true }); } catch {} };
  process.on("exit", release);
  return { waitedS: +((Date.now() - t0) / 1000).toFixed(1), release };
}
/** Optionally wait until no other seat's headless browser runs (`--wait-quiet <s>`); always report the census. */
export async function quiet(waitS = 0) {
  const t0 = Date.now();
  let c = browserCensus();
  while (c.n > 0 && (Date.now() - t0) / 1000 < waitS) { await new Promise((r) => setTimeout(r, 5000)); c = browserCensus(); }
  return { ...c, waitedS: +((Date.now() - t0) / 1000).toFixed(1) };
}

/**
 * H3-1 · the step trace: with `TILE_HARNESS_TRACE=1` every page step (context, page, goto, ready, fonts, settle,
 * each measurement step a witness names) prints one stderr line with the time since the process started, the step's
 * own duration and the load. A stall then names its step instead of its scene only.
 */
const T0 = Date.now();
export const TRACE = !!process.env.TILE_HARNESS_TRACE;
/** This process's descendant browser processes: pid, %cpu, rss MB and a short name (ps; no browser API). */
export function ownBrowsers() {
  let out = "";
  try { out = execFileSync("ps", ["-axo", "pid=,ppid=,pcpu=,rss=,command="], { encoding: "utf8", maxBuffer: 32 << 20 }); } catch { return []; }
  const rows = out.split("\n").map((l) => l.trim().match(/^(\d+)\s+(\d+)\s+([\d.]+)\s+(\d+)\s+(.*)$/)).filter(Boolean);
  const mine = new Set([String(process.pid)]);
  let grew = true;
  while (grew) { grew = false; for (const [, pid, ppid] of rows) if (mine.has(ppid) && !mine.has(pid)) { mine.add(pid); grew = true; } }
  // Playwright WebKit's WebContent, Networking and GPU services are XPC services launchd starts (ppid 1), so they are
  // nobody's descendants; they are listed by their Playwright path and marked `xpc` (another seat's WebKit would
  // share the label: the census says whether one ran)
  const xpc = (cmd) => /ms-playwright\/webkit-\d+\/.*\.xpc\//.test(cmd);
  return rows.filter(([, pid, ppid, , , cmd]) => pid !== String(process.pid) && !/^ps -axo/.test(cmd) && (mine.has(pid) || (ppid === "1" && xpc(cmd))))
    .map(([, pid, ppid, cpu, rss, cmd]) => ({ pid: +pid, cpu: +cpu, rssMB: Math.round(+rss / 1024),
      name: (xpc(cmd) ? "xpc:" + (cmd.match(/com\.apple\.WebKit\.(\w+)/)?.[1] ?? "?") : (cmd.match(/(pw_run\.sh|Playwright\.app|chrome-headless-shell|headless_shell)/) ?? [cmd.slice(0, 30)])[0]) + (/--type=([\w-]+)/.exec(cmd)?.[1] ? `:${/--type=([\w-]+)/.exec(cmd)[1]}` : "") }));
}
// H3-1: under TILE_HARNESS_TRACE every 5 s prints this process's browser processes (a spinning renderer shows as
// a WebContent process pinned near 100 % while the page step waits)
if (TRACE) setInterval(() => {
  const ps = ownBrowsers();
  // open file descriptors per process (lsof): launchd starts the XPC services with a soft limit of 256
  const fds = (pid) => { try { return execFileSync("lsof", ["-p", String(pid)], { encoding: "utf8", maxBuffer: 32 << 20 }).split("\n").length - 2; } catch { return "?"; } };
  process.stderr.write(`[trace +${((Date.now() - T0) / 1000).toFixed(1)}s] procs ${ps.length}: ${ps.map((p) => `${p.name}#${p.pid} ${p.cpu}% ${p.rssMB}MB ${fds(p.pid)}fd`).join(", ")} · load ${load()}\n`);
}, 5000).unref();
export async function step(label, fn) {
  if (!TRACE) return fn();
  const t = Date.now();
  process.stderr.write(`[trace +${((t - T0) / 1000).toFixed(1)}s] ${label} …\n`);
  try { return await fn(); }
  finally { process.stderr.write(`[trace +${((Date.now() - T0) / 1000).toFixed(1)}s] ${label} done in ${Date.now() - t} ms · load ${load()}\n`); }
}

// ── CLI ───────────────────────────────────────────────────────────────────────
export function parseArgs(argv = process.argv.slice(2)) {
  const a = { positional: [] };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k.startsWith("--")) {
      const key = k.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) a[key] = true;
      else { a[key] = next; i++; }
    } else a.positional.push(k);
  }
  return a;
}
export function outRoot(args) {
  return path.resolve(args.out ?? process.env.TILE_HARNESS_OUT ?? path.join(os.tmpdir(), "tile-harness"));
}

// ── static serving ────────────────────────────────────────────────────────────
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf" };
/** Serve a directory, or a function (URL → html string). */
export function serve(rootOrFn) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://x");
    if (typeof rootOrFn === "function") {
      const body = rootOrFn(url);
      if (body === null) return; // a planted stall: the request is held, never answered (fixture fault `stall`)
      res.writeHead(200, { "content-type": MIME[".html"], "cache-control": "no-store" });
      res.end(body);
      return;
    }
    let p = path.join(rootOrFn, decodeURIComponent(url.pathname));
    if (!p.startsWith(rootOrFn)) { res.writeHead(403); res.end(); return; }
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(rootOrFn, "index.html");
    res.writeHead(200, { "content-type": MIME[path.extname(p)] ?? "application/octet-stream", "cache-control": "no-store" });
    fs.createReadStream(p).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => {
    resolve({ url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((r) => server.close(r)) });
  }));
}

// ── targets: a build of the scene page, or the hand-made fixture ──────────────
/**
 * `--build <dir>` (from build.mjs) or `--fixture [--family e] [--fault <name>] [--flavor dist|dist-dev|src-dev]`.
 * A target's `flavor` says what the library under test is (H-9): `src` / `src-dev` alias the worktree's src
 * (production or DEV compile), `dist` / `dist-dev` import the library's built dist as a consumer installs it
 * (consumer production build or consumer dev build). The fixture emulates a flavour: its DEV-only code runs only
 * under `src-dev`, as a library build strips `import.meta.env.DEV` branches.
 */
export async function openTarget(args) {
  if (args.fixture) {
    const { fixturePage } = await import("./fixtures.mjs");
    const fault = typeof args.fault === "string" ? args.fault : "";
    const family = typeof args.family === "string" ? args.family : "";
    const flavor = typeof args.flavor === "string" ? args.flavor : "dist";
    const srv = await serve((url) => fixturePage(url.searchParams, fault, family, flavor));
    const label = `fixture${family ? "-" + family : ""}${fault ? "+" + fault : ""}${flavor !== "dist" ? "@" + flavor : ""}`;
    return { kind: "fixture", label, fault, url: (q) => `${srv.url}/?${q}`, close: srv.close, meta: { label, dev: flavor === "src-dev", flavor, migration: "fixture" } };
  }
  if (!args.build || !fs.existsSync(path.join(args.build, "build.json"))) {
    throw new Error("pass --build <dir> (the directory build.mjs printed) or --fixture");
  }
  const dir = path.resolve(args.build);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, "build.json"), "utf8"));
  const srv = await serve(path.join(dir, "dist"));
  return { kind: "build", label: meta.label, url: (q) => `${srv.url}/index.html?${q}`, close: srv.close, meta };
}
/** A refusal or guard cell gates only against what a consumer installs (H-9): a dist flavour, or the fixture's emulation of one. */
export const installed = (meta) => meta.flavor === "dist" || meta.flavor === "dist-dev";

// ── engines ───────────────────────────────────────────────────────────────────
const browsers = {};
/**
 * Engine disconnects seen by this process. A browser that died (a renderer crash under load) is relaunched on
 * the next open instead of leaving a dead handle that fails every later scene; each disconnect is recorded and
 * printed as a note, so a crash is never silent. A witness that retries a crashed segment says whether the
 * crash reproduced.
 */
export const disconnects = [];
export const engineClosed = (e) => /has been closed|crashed|disconnected|Target closed/i.test(String(e?.message ?? e));
export async function browser(engine) {
  if (browsers[engine] && !browsers[engine].isConnected()) { disconnects.push({ engine, load: load() }); delete browsers[engine]; }
  if (!browsers[engine]) {
    browsers[engine] = engine === "webkit" ? await pw.webkit.launch() : await pw.chromium.launch({ channel: "chromium" });
  }
  return browsers[engine];
}
export async function closeBrowsers() {
  for (const k of Object.keys(browsers)) await dropBrowser(k);
}
/**
 * Close one engine's browser, bounded: a WebKit whose navigation waits on an AppSSO reply that never comes cannot
 * close its page (H3-1), so after 15 s the browser's own processes (this process's descendants) are killed.
 */
async function dropBrowser(engine) {
  const b = browsers[engine]; delete browsers[engine]; navs[engine] = 0;
  if (!b) return;
  const r = await within(15000, () => b.close());
  if (!r.ok) for (const p of ownBrowsers().filter((x) => !x.name.startsWith("xpc:"))) { try { process.kill(p.pid, "SIGKILL"); } catch {} }
}

/**
 * H3-1 · the routed Playwright WebKit T-3 stall (F1-3, HF-2), root-caused. Every http(s) main-frame navigation in
 * Playwright WebKit asks macOS AppSSO whether the URL belongs to an SSO extension before it loads
 * (`SOAuthorizationCoordinator::tryAuthorize` → AppSSOCore `canPerformAuthorizationWithURL`; `appsso-probe.mjs`
 * counts one call per `goto` and per `location.assign`, none for about:blank). In the boot epoch that ended
 * 2026-10-07 14:32:54, the unified log shows that call's reply never arriving at the 90th or 91st navigation of
 * one Playwright process, in all three processes that got that far (pids 11741, 24625, 66362), while other
 * Playwright processes' calls answered at the same moments. The navigation then waits forever, its page cannot
 * close, and a fresh context in the same process stalls the same way. The routed T-3 was the only witness whose one
 * browser opened ≥ 90 pages, and `preset-contents (light)` was its 90th: hence "routed", hence that scene, 10 of 10
 * pass-2 stalls. Unrouted, the same witness opened 75.
 * The cure is per process, as the fault is: a WebKit browser is retired after NAV_CAP navigations (default 60, under
 * the 89 that held) and relaunched, and a stall is diagnosed from the unified log (`appssoPending`), its browser
 * dropped (not a fresh context in it), and the page re-opened once on a new process. Every retirement and every
 * stall is printed. TILE_HARNESS_NAV_CAP overrides the cap (the self-test runs it at 5).
 */
export const NAV_CAP = Number(process.env.TILE_HARNESS_NAV_CAP ?? 60);
const navs = {};
export const recycles = [];
/** The pid of this process's Playwright WebKit UI process, or null. */
function webkitPid() { return ownBrowsers().find((p) => p.name === "Playwright.app")?.pid ?? null; }
/**
 * Read the unified log of this process's Playwright WebKit for the last 3 minutes: is an AppSSO check pending (a
 * `Calling async canPerformAuthorizationWithURL` with no later `completed`)? macOS only; null when it cannot read.
 */
export function appssoPending(pid = webkitPid()) {
  if (!pid || process.platform !== "darwin") return null;
  let out = "";
  try { out = execFileSync("log", ["show", "--last", "3m", "--style", "compact", "--predicate", `processID == ${pid} AND category == "AppSSO"`], { encoding: "utf8", maxBuffer: 64 << 20, timeout: 60000 }); } catch (e) { out = String(e.stdout ?? ""); if (!out) return null; }
  const lines = out.split("\n").filter((l) => /canPerformAuthorizationWithURL/.test(l));
  const calls = lines.filter((l) => /Calling async/.test(l)).length, done = lines.filter((l) => /completed/.test(l)).length;
  const last = lines.at(-1) ?? "";
  return { pid, calls, completed: done, pending: /Calling async/.test(last), at: last.slice(11, 23) };
}
export async function engineVersion(engine) {
  return `${ENGINE_LABEL[engine]} ${(await browser(engine)).version()}`;
}

/** The forced level-0 path: the one knob the library's PRT bracket sets (a11y-fallback.css). */
const LEVEL0 = ":root{--glass-level:0 !important;--glass-grain-opacity:0 !important}";

/**
 * Open one scene in one cell. mode: light | dark | prt | forced. flags: prm, coarse, uiScale (H-1: the comfort
 * axis set on :root); query: extra URL params.
 * PRT: Chromium emulates `prefers-reduced-transparency` over CDP; Playwright WebKit
 * cannot, so it takes the forced level-0 path and the cell says so.
 */
/**
 * Page loads that stalled (the scene never reported ready, or `goto` timed out) and were re-opened once on a fresh
 * context. D4-F prototype: under `--route`, a Playwright WebKit T-3 run stalled in `openPage` in every routed run of
 * the D4-F block test (F1-3) and again in the prototype's first battery (`waitForFunction` on `__tile.ready`, 30 s).
 * The stall does not name its scene and does not reproduce on a fresh page, so `openPage` now re-opens once: a stall
 * that does not reproduce is printed NOT-REPRODUCED with its scene, mode and load; one that reproduces throws with
 * its scene named. It is a recovery path like the engine-closed relaunch, not a check, and every use is printed.
 */
export const stalls = [];
export async function openPage(target, engine, scene, opts = {}) {
  try { return await openPageOnce(target, engine, scene, opts); }
  catch (e) {
    if (engineClosed(e)) throw e;
    const first = String(e.message ?? e).split("\n")[0];
    // H3-1: name the cause before the browser goes, then re-open on a NEW browser process (the fault is per process)
    const nav = navs[engine] ?? 0;
    const dx = engine === "webkit" ? appssoPending() : null;
    const cause = dx === null ? (engine === "webkit" ? "AppSSO state unread" : "no AppSSO in this engine")
      : dx.pending ? `AppSSO check PENDING since ${dx.at} (navigation #${nav} of this browser; ${dx.completed}/${dx.calls} answered in 3 min)`
      : `AppSSO answered (${dx.completed}/${dx.calls} in 3 min): not the AppSSO stall`;
    await dropBrowser(engine);
    try {
      const P = await openPageOnce(target, engine, scene, opts);
      stalls.push({ engine, scene, mode: opts.mode ?? "light", load: load(), first, cause, reproduced: false });
      return P;
    } catch (e2) {
      stalls.push({ engine, scene, mode: opts.mode ?? "light", load: load(), first, cause, reproduced: true });
      throw new Error(`openPage ${scene} (${opts.mode ?? "light"}) stalled twice, the second time on a new browser process, REPRODUCED: ${first} / ${String(e2.message ?? e2).split("\n")[0]} · first stall: ${cause}`);
    }
  }
}
async function openPageOnce(target, engine, scene, { mode = "light", prm = false, coarse = false, uiScale = null, query = {} } = {}) {
  const tag = `${ENGINE_LABEL[engine]} ${scene} (${mode})`;
  if (engine === "webkit" && (navs[engine] ?? 0) >= NAV_CAP) {
    recycles.push({ engine, after: navs[engine], load: load() });
    await step(`${tag} retire browser after ${navs[engine]} navigations`, () => dropBrowser(engine));
  }
  const b = await step(`${tag} browser`, () => browser(engine));
  const opts = {
    viewport: VIEWPORT, deviceScaleFactor: DSF,
    colorScheme: mode === "dark" ? "dark" : "light",
    reducedMotion: prm ? "reduce" : "no-preference",
    forcedColors: mode === "forced" ? "active" : "none",
  };
  if (coarse) { opts.hasTouch = true; if (engine === "chromium") opts.isMobile = true; }
  const ctx = await step(`${tag} newContext`, () => b.newContext(opts));
  const page = await step(`${tag} newPage`, () => ctx.newPage());
  const logs = [];
  page.on("console", (m) => logs.push({ type: m.type(), text: m.text() }));
  page.on("pageerror", (e) => logs.push({ type: "pageerror", text: String(e) }));
  let cdp = null;
  if (engine === "chromium") {
    cdp = await ctx.newCDPSession(page);
    if (mode === "prt") {
      await cdp.send("Emulation.setEmulatedMedia", { features: [
        { name: "prefers-color-scheme", value: "light" },
        { name: "prefers-reduced-motion", value: prm ? "reduce" : "no-preference" },
        { name: "prefers-reduced-transparency", value: "reduce" },
      ] });
    }
  }
  await page.addInitScript(`(${inPageHelpers.toString()})()`);
  const q = new URLSearchParams({ scene });
  if (mode === "dark") q.set("mode", "dark");
  for (const [k, v] of Object.entries(query)) q.set(k, String(v));
  navs[engine] = (navs[engine] ?? 0) + 1;
  try {
    await step(`${tag} goto`, () => page.goto(target.url(q.toString()), { waitUntil: "load", timeout: 60000 }));
    await step(`${tag} ready`, () => page.waitForFunction(() => window.__tile && window.__tile.ready === true, null, { timeout: 30000 }));
  } catch (e) { await within(10000, () => ctx.close()); throw e; }
  if (mode === "prt" && engine !== "chromium") await page.addStyleTag({ content: LEVEL0 });
  if (uiScale !== null) await page.addStyleTag({ content: `:root{--ui-scale:${uiScale} !important}` });
  await step(`${tag} fonts`, () => page.evaluate(() => document.fonts.ready.then(() => true)));
  await step(`${tag} settle`, () => page.waitForTimeout(SETTLE_MS));
  const verify = await page.evaluate(() => ({
    dark: document.documentElement.classList.contains("dark"),
    prt: matchMedia("(prefers-reduced-transparency: reduce)").matches,
    forced: matchMedia("(forced-colors: active)").matches,
    prm: matchMedia("(prefers-reduced-motion: reduce)").matches,
    hoverNone: matchMedia("(hover: none)").matches,
    coarse: matchMedia("(pointer: coarse)").matches,
    uiScale: getComputedStyle(document.documentElement).getPropertyValue("--ui-scale").trim(),
    dev: !!window.__tile.dev,
  }));
  let modeLabel = mode, modeOk = true;
  if (mode === "dark") modeOk = verify.dark;
  if (mode === "prt") {
    if (engine === "chromium") modeOk = verify.prt;
    else modeLabel = "prt (forced level-0 path)";
  }
  if (mode === "forced") modeOk = verify.forced;
  if (prm && !verify.prm) modeOk = false;
  if (coarse) { modeLabel += " coarse"; if (!(verify.hoverNone && verify.coarse)) modeOk = false; }
  if (uiScale !== null) { modeLabel += ` --ui-scale ${uiScale}`; if (parseFloat(verify.uiScale) !== uiScale) modeOk = false; }
  return { page, ctx, cdp, logs, verify, engine, keys: KEYS[engine], mode, modeLabel, modeOk, close: () => step(`${tag} close`, () => ctx.close()) };
}

// ── in-page helpers (window.__th): DOM reads only, no source text ─────────────
function inPageHelpers() {
  const px = (s) => { const v = parseFloat(s); return Number.isFinite(v) ? v : 0; };
  const rad = (v, w, h) => {
    const [a, b = a] = String(v).trim().split(/\s+/);
    const f = (t, L) => (t.endsWith("%") ? (parseFloat(t) / 100) * L : px(t));
    return { x: f(a, w), y: f(b, h) };
  };
  const th = {
    scene: () => document.querySelector("[data-scene]"),
    group(root = th.scene()) { return (root && root.querySelector("[data-group]")) || root; },
    items(root = th.scene()) {
      if (!root) return [];
      const marked = [...root.querySelectorAll("[data-item]")];
      if (marked.length) return marked;
      return [...th.group(root).querySelectorAll('[role="radio"],[role="option"],[role="tab"],[aria-pressed],[aria-checked]')];
    },
    on(el) {
      for (const n of ["aria-checked", "aria-pressed", "aria-selected"]) {
        const v = el.getAttribute(n);
        if (v !== null) return v === "true";
      }
      const s = el.getAttribute("data-state");
      if (s !== null) return s === "on" || s === "checked" || s === "active";
      // a hand-rolled site that exposes its selection to nobody (F1): the scene stamps a harness-only hook, so
      // paint witnesses can find the pair while T-5 still reads the real (absent) state
      return el.getAttribute("data-th-on") === "true";
    },
    /** Resolves after the mutation's frame has painted: the second animation frame (H-1's framed read). */
    frame: () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))),
    /** The layout border box (unaffected by scale/transform). */
    size(el) {
      const cs = getComputedStyle(el);
      let w = px(cs.width), h = px(cs.height);
      if (cs.boxSizing !== "border-box") {
        w += px(cs.paddingLeft) + px(cs.paddingRight) + px(cs.borderLeftWidth) + px(cs.borderRightWidth);
        h += px(cs.paddingTop) + px(cs.paddingBottom) + px(cs.borderTopWidth) + px(cs.borderBottomWidth);
      }
      return { w, h };
    },
    /** The used corner by the CSS Backgrounds 3 §5.5 overlap rule. */
    corner(el) {
      const cs = getComputedStyle(el);
      const { w, h } = th.size(el);
      const tl = rad(cs.borderTopLeftRadius, w, h), tr = rad(cs.borderTopRightRadius, w, h);
      const br = rad(cs.borderBottomRightRadius, w, h), bl = rad(cs.borderBottomLeftRadius, w, h);
      const q = (L, s) => (s > 0 ? L / s : Infinity);
      const f = Math.min(1, q(w, tl.x + tr.x), q(w, bl.x + br.x), q(h, tl.y + bl.y), q(h, tr.y + br.y));
      return { w, h, computed: cs.borderTopLeftRadius, rx: tl.x, ry: tl.y, used: tl.x * f, usedY: tl.y * f, clamped: f < 0.9995 };
    },
    rect(el) { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; },
    tokenNames(prefix = "--radius-") {
      const names = new Set();
      const cs = getComputedStyle(document.documentElement);
      for (let i = 0; i < cs.length; i++) if (cs[i].startsWith(prefix)) names.add(cs[i]);
      const walk = (rules) => {
        for (const r of rules) {
          if (r.style) for (let i = 0; i < r.style.length; i++) if (r.style[i].startsWith(prefix)) names.add(r.style[i]);
          if (r.cssRules) walk(r.cssRules);
        }
      };
      for (const s of document.styleSheets) { try { walk(s.cssRules); } catch { /* cross-origin */ } }
      return [...names].sort();
    },
    /** Resolve a custom property IN the element's context (a probe child reads it). */
    resolve(el, name, prop = "border-top-left-radius") {
      const p = document.createElement("span");
      p.setAttribute("data-th-probe", "");
      p.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;${prop}:var(${name})`;
      el.appendChild(p);
      const v = getComputedStyle(p).getPropertyValue(prop).trim();
      p.remove();
      return v;
    },
    /**
     * Every named radius role that resolves to a finite px corner at the DOCUMENT ROOT (H-1). A role is named
     * where the canon declares it; a role an element re-declares for itself (A1's `:where(*)` restatement) would
     * name whatever corner that element wears, so it is never read in the item's own context.
     */
    rungs() {
      const root = document.body;
      return th.tokenNames().map((n) => ({ name: n, value: th.resolve(root, n) }))
        .filter((t) => /^[\d.]+px$/.test(t.value) && px(t.value) > 0 && px(t.value) < 999)
        .map((t) => ({ name: t.name, px: px(t.value) }));
    },
    /**
     * Rows of content: text line boxes, graphics and painted leaves inside [data-ink], clustered top-down. A rect
     * opens a new row when its vertical midpoint lies below the current row's bottom (H-8, the midpoint test): two
     * stacked lines at `line-height: 1` overlap by their glyph overhang and still read as two rows, while an icon
     * beside a label, or a badge beside a label, stays one.
     */
    /** Content boxes inside the item: text line boxes, graphics and painted leaves inside [data-ink] (or the item), each with its node. */
    contentRects(el) {
      const roots = [...el.querySelectorAll("[data-ink]")].filter((e) => !e.parentElement.closest("[data-ink]"));
      const scope = roots.length ? roots : [el];
      const rects = [];
      for (const root of scope) {
        const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        while (tw.nextNode()) {
          const t = tw.currentNode;
          if (!t.textContent.trim()) continue;
          if (t.parentElement && t.parentElement.closest(".sr-only,[hidden]")) continue;
          const r = document.createRange(); r.selectNodeContents(t);
          for (const q of r.getClientRects()) if (q.width > 0.5 && q.height > 0.5) rects.push({ q, node: t.parentElement });
        }
        for (const e of [root, ...root.querySelectorAll("*")]) {
          if (e.closest("svg") && e.tagName.toLowerCase() !== "svg") continue;
          const cs = getComputedStyle(e);
          const graphic = /^(svg|img|canvas|video|input)$/i.test(e.tagName);
          const leafPaint = !e.children.length && (cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.backgroundImage !== "none");
          if (!graphic && !leafPaint) continue;
          const q = e.getBoundingClientRect();
          if (q.width > 0.5 && q.height > 0.5) rects.push({ q, node: e });
        }
      }
      return rects;
    },
    /**
     * Rows of content (contentRects): a box lies below another when its vertical midpoint lies below the other's
     * bottom (H-8, the midpoint test), and the rows are the longest chain of such boxes. Two stacked lines at
     * `line-height: 1` overlap by their glyph overhang and still read as two rows; an icon beside a label, or a
     * badge beside a label, stays one; two lines beside an icon read two.
     */
    rows(el) {
      // H3-3: the longest chain of boxes each lying below the last by the midpoint test (b's midpoint below a's
      // bottom). H2 clustered top-down and let a tall box (an icon, a two-line name) extend a row's bottom, so two
      // stacked text lines beside a 16 px icon read as one row (`pass-3/H3.md` §3.2, a vacuous one-row PASS)
      const rects = th.contentRects(el).map((r) => r.q).sort((a, b) => a.top - b.top);
      const depth = rects.map(() => 1);
      for (let j = 0; j < rects.length; j++) for (let i = 0; i < j; i++)
        if ((rects[j].top + rects[j].bottom) / 2 > rects[i].bottom) depth[j] = Math.max(depth[j], depth[i] + 1);
      return rects.length ? Math.max(...depth) : 0;
    },
    /**
     * H3-3 · content the plate does not show: a content box past the item's border box (spilt), or past an ancestor
     * inside the item that clips (overflow other than visible). Returns the count and the worst overhang in px.
     */
    cut(el) {
      const box = el.getBoundingClientRect();
      let n = 0, worst = 0;
      const past = (q, b) => Math.max(b.top - q.top, q.bottom - b.bottom, b.left - q.left, q.right - b.right);
      for (const { q, node } of th.contentRects(el)) {
        let over = past(q, box);
        for (let a = node; a && a !== el && el.contains(a); a = a.parentElement) {
          const cs = getComputedStyle(a);
          if (cs.overflowX !== "visible" || cs.overflowY !== "visible") over = Math.max(over, past(q, a.getBoundingClientRect()));
        }
        if (over > 0.5) { n++; worst = Math.max(worst, over); }
      }
      return { n, worst };
    },
    /** The item's one-line extent: its [data-ink] content swapped for one short text line, measured, restored. */
    rung(el) {
      const tops = [...el.querySelectorAll("[data-ink]")].filter((e) => !e.parentElement.closest("[data-ink]"));
      if (!tops.length) return th.size(el).h;
      const marks = tops.map((e) => { const c = document.createComment("th"); e.replaceWith(c); return [c, e]; });
      const x = document.createElement("span"); x.textContent = "x";
      marks[0][0].before(x);
      const h = th.size(el).h;
      x.remove();
      marks.forEach(([c, e]) => c.replaceWith(e));
      return h;
    },
    /** Append one more line to the item's [data-line-slot]; removeLines() takes every added line out. */
    addLine(el) {
      const slot = el.querySelector("[data-line-slot]") || el;
      const br = document.createElement("br"); br.setAttribute("data-th-added", "");
      const s = document.createElement("span"); s.setAttribute("data-th-added", ""); s.textContent = "one more line";
      slot.append(br, s);
    },
    removeLines(el) { el.querySelectorAll("[data-th-added]").forEach((n) => n.remove()); },
    hideInk(on) {
      let st = document.getElementById("__th_ink");
      if (on && !st) {
        st = document.createElement("style"); st.id = "__th_ink";
        st.textContent = "[data-ink],[data-ink] *{visibility:hidden !important}";
        document.head.appendChild(st);
      }
      if (!on && st) st.remove();
    },
    pin(el, on) {
      if (on) { el.style.setProperty("scale", "1", "important"); el.style.setProperty("transition", "none", "important"); }
      else { el.style.removeProperty("scale"); el.style.removeProperty("transition"); }
    },
    scale(el) {
      const cs = getComputedStyle(el);
      let sx = 1, sy = 1;
      if (cs.scale && cs.scale !== "none") { const p = cs.scale.split(/\s+/).map(parseFloat); sx = p[0]; sy = p[1] ?? p[0]; }
      if (cs.transform && cs.transform !== "none") { const m = new DOMMatrixReadOnly(cs.transform); sx *= Math.hypot(m.a, m.b); sy *= Math.hypot(m.c, m.d); }
      return { sx, sy, scale: cs.scale, transform: cs.transform };
    },
    /** Running animations and transitions on the item and its library-owned subtree (consumer [data-ink] content excluded). */
    anims(el) {
      return el.getAnimations({ subtree: true }).filter((a) => {
        const t = a.effect && a.effect.target;
        return !(t && t.closest && t.closest("[data-ink]"));
      }).map((a) => ({
        kind: a.constructor.name,
        prop: a.transitionProperty ?? a.animationName ?? "",
        target: (a.effect.target === el ? "item" : (a.effect.target?.tagName?.toLowerCase() ?? "?")) + (a.effect.pseudoElement ?? ""),
        duration: a.effect.getComputedTiming().duration,
        state: a.playState,
      }));
    },
    /**
     * H-4's commit sampler: every animation frame for `ms`, each item's scale and on-state, a paint signature of
     * the item and its two pseudo-elements (opacity, fills, border, shadow, outline colour), and the rect of a
     * selection body (`[data-selection-body]` in the group) if the build has one. Results in window.__th_sample.
     */
    startSample(ms) {
      const its = th.items(), g = th.group();
      const sig = (el) => {
        const out = [];
        for (const pe of [null, "::before", "::after"]) { const c = getComputedStyle(el, pe); out.push(c.opacity, c.backgroundColor, c.backgroundImage, c.borderTopColor, c.boxShadow, c.outlineColor); }
        return out.join("|");
      };
      const frames = [], t0 = performance.now();
      window.__th_sample = { done: false, frames };
      const tick = () => {
        const t = performance.now() - t0;
        const b = g && g.querySelector("[data-selection-body]");
        frames.push({ t, s: its.map((e) => th.scale(e).sx), on: its.map((e) => th.on(e)), sig: its.map(sig), body: b ? th.rect(b) : null });
        if (t < ms) requestAnimationFrame(tick); else window.__th_sample.done = true;
      };
      requestAnimationFrame(tick);
    },
    tag() {
      const its = th.items();
      document.querySelectorAll("[data-th-idx]").forEach((e) => e.removeAttribute("data-th-idx"));
      its.forEach((e, i) => e.setAttribute("data-th-idx", String(i)));
      const g = th.group(); if (g) g.setAttribute("data-th-group", "");
      return its.length;
    },
    active() {
      const a = document.activeElement;
      if (!a || a === document.body) return "body";
      const s = a.getAttribute("data-sentinel"); if (s) return s;
      const it = a.closest("[data-th-idx]");
      if (it && a !== it) return `inside:${it.getAttribute("data-th-idx")}`;
      return it ? Number(it.getAttribute("data-th-idx")) : `other:${a.tagName.toLowerCase()}${a.className && typeof a.className === "string" ? "." + a.className.split(/\s+/)[0] : ""}`;
    },
  };
  window.__th = th;
}

/** The in-page helpers as a script, for a driver without init scripts (safari.mjs executes it after load). */
export const IN_PAGE = `(${inPageHelpers.toString()})()`;

// ── pixels ────────────────────────────────────────────────────────────────────
export function clipAround(r, pad) {
  const x = Math.floor(r.x - pad), y = Math.floor(r.y - pad);
  return { x, y, width: Math.ceil(r.x + r.w + pad) - x, height: Math.ceil(r.y + r.h + pad) - y };
}
export async function shot(page, clip) {
  const buf = await page.screenshot({ clip, animations: "disabled", caret: "hide" });
  const png = PNG.sync.read(buf);
  return { png, clip, dsf: png.width / clip.width };
}
export const lum = (c) => {
  const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
};
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
export const hex = (c) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
export function px(s, i) { const d = s.png.data; return [d[i * 4], d[i * 4 + 1], d[i * 4 + 2]]; }
/** Mean colour over a CSS-px rect inside the shot. */
export function meanRect(s, r) {
  const { png, clip, dsf } = s;
  const x0 = Math.max(0, Math.round((r.x - clip.x) * dsf)), y0 = Math.max(0, Math.round((r.y - clip.y) * dsf));
  const x1 = Math.min(png.width, Math.round((r.x + r.w - clip.x) * dsf)), y1 = Math.min(png.height, Math.round((r.y + r.h - clip.y) * dsf));
  let R = 0, G = 0, B = 0, n = 0;
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const i = (y * png.width + x) * 4; R += png.data[i]; G += png.data[i + 1]; B += png.data[i + 2]; n++; }
  return n ? [R / n, G / n, B / n] : [0, 0, 0];
}
/**
 * Per-pixel comparison of two shots of the same clip, the R3-02 method:
 * `changed` = largest channel moved by more than 10; `cN` = pixels whose own
 * contrast against the other shot's pixel is at least N:1; `p95` of that contrast.
 * `c3Edge` counts the ≥ 3:1 pixels inside `edgeBand` device pixels of the clip's border (the perimeter band where
 * an edge carrier lives), `c3Inner` the rest (a mark, a flood). Counts are device pixels.
 */
export function compare(a, b, mask = null, edgeBand = 0) {
  const W = a.png.width, H = a.png.height, n = W * H;
  let changed = 0, c3 = 0, c15 = 0, total = 0, c3Edge = 0;
  const cs = [];
  for (let i = 0; i < n; i++) {
    if (mask && !mask(i)) continue;
    total++;
    const p = px(a, i), q = px(b, i);
    if (Math.max(Math.abs(p[0] - q[0]), Math.abs(p[1] - q[1]), Math.abs(p[2] - q[2])) > 10) changed++;
    const c = contrast(p, q);
    if (c >= 3) {
      c3++;
      const x = i % W, y = (i - x) / W;
      if (edgeBand && (x < edgeBand || y < edgeBand || x >= W - edgeBand || y >= H - edgeBand)) c3Edge++;
    }
    if (c >= 1.5) c15++;
    cs.push(c);
  }
  cs.sort((x, y) => x - y);
  return { total, changed, c3, c15, c3Edge, c3Inner: c3 - c3Edge, p95: cs.length ? cs[Math.floor(cs.length * 0.95)] : 1 };
}
/** sRGB (0-255) → OKLab [L, a, b] (Björn Ottosson's matrices). */
export function oklab(c) {
  const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const [r, g, b] = c.map(f);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
/**
 * H3-5 · the mean perceptual distance (ΔE in OKLab, Euclidean) between two shots of the same clip, over a CSS-px
 * rect inside it. A continuous read: it has no per-pixel threshold for a rung to sit on (H2's light channel counted
 * pixels whose largest channel moved by more than 10 levels, and a 5 % ink step moved about 10).
 */
export function meanDeltaE(a, b, r) {
  const { png, clip, dsf } = a;
  const x0 = Math.max(0, Math.round((r.x - clip.x) * dsf)), y0 = Math.max(0, Math.round((r.y - clip.y) * dsf));
  const x1 = Math.min(png.width, Math.round((r.x + r.w - clip.x) * dsf)), y1 = Math.min(png.height, Math.round((r.y + r.h - clip.y) * dsf));
  let sum = 0, n = 0;
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
    const i = y * png.width + x, p = oklab(px(a, i)), q = oklab(px(b, i));
    sum += Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); n++;
  }
  return n ? sum / n : 0;
}
export function savePng(s, file) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, PNG.sync.write(s.png)); }

// ── CDP: accessibility tree and matched styles (Chromium only) ────────────────
/** backendNodeIds for a selector, through the CDP DOM domain. */
export async function backendIds(cdp, selector) {
  const { root } = await cdp.send("DOM.getDocument", { depth: 0 });
  const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector });
  const out = [];
  for (const nodeId of nodeIds) { const { node } = await cdp.send("DOM.describeNode", { nodeId }); out.push({ nodeId, backendNodeId: node.backendNodeId }); }
  return out;
}
/** The AX node for one DOM node: role, name and the state properties. */
export async function axOf(cdp, backendNodeId) {
  const { nodes } = await cdp.send("Accessibility.getPartialAXTree", { backendNodeId, fetchRelatives: false });
  const n = nodes.find((x) => x.backendDOMNodeId === backendNodeId) ?? nodes[0];
  if (!n) return { role: null };
  const prop = (k) => n.properties?.find((p) => p.name === k)?.value?.value;
  return { role: n.role?.value ?? null, name: n.name?.value ?? "", ignored: !!n.ignored, checked: prop("checked"), pressed: prop("pressed"), selected: prop("selected"), focusable: prop("focusable") };
}

// ── reporting ─────────────────────────────────────────────────────────────────
/**
 * A witness result: { id, title, engine, target, cells: [{ gating, pass (true|false|null), line, arm?, ... }] }.
 * Cells carry an `arm` (H-7): `library` (the scene as the library ships, consumer paint stripped), `unmigrated`
 * (the consumer's HEAD composition, reported) or `migrated` (a route's migration, gating). The verdict gates
 * the library and migrated arms; the unmigrated arm has its own tally beside it.
 */
export function verdict(res) {
  const gating = res.cells.filter((c) => c.gating);
  const measured = gating.filter((c) => c.pass !== null);
  const passed = measured.filter((c) => c.pass).length;
  res.pass = measured.length > 0 && passed === measured.length;
  res.tally = `${passed}/${measured.length} gating cells pass` + (gating.length > measured.length ? `, ${gating.length - measured.length} unmeasured` : "");
  const arms = {};
  for (const c of res.cells) {
    const a = c.arm ?? "library";
    if (!c.gating && a !== "unmigrated") continue;
    if (c.pass === null) continue;
    arms[a] ??= { pass: 0, of: 0 };
    arms[a].of++; if (c.pass) arms[a].pass++;
  }
  res.arms = arms;
  const armText = Object.entries(arms).map(([k, v]) => `${k} ${v.pass}/${v.of}`).join(" · ");
  if (armText) res.tally += ` [${armText}]`;
  return res;
}
export function print(res) {
  console.log(`${res.id} · ${res.title}`);
  console.log(`  target ${res.target} (flavor ${res.flavor ?? "?"}${res.dev ? ", DEV" : ""}) · ${res.engineLabel} · harness ${res.harness?.rev ?? "?"} ${res.harness?.hash ?? "?"}`);
  if (res.run) console.log(`  load ${res.run.loadStart} at start, ${res.run.loadEnd} at end · other headless browser processes at start: ${res.run.census.n}${res.run.census.waitedS ? ` (waited ${res.run.census.waitedS} s)` : ""} · browser lock waited ${res.run.lockWaitS} s`);
  for (const c of res.cells) {
    const tag = c.pass === null ? "UNMEASURED" : !c.gating ? (c.pass ? "info-pass" : "info-fail") : c.pass ? "PASS" : "FAIL";
    console.log(`  ${tag.padEnd(10)} ${c.arm && c.arm !== "library" ? `[${c.arm}] ` : ""}${c.line}`);
  }
  for (const n of res.notes ?? []) console.log(`  note ${n}`);
  console.log(`${res.id} ${res.pass ? "PASS" : "FAIL"} · ${res.tally}`);
}
/** CLI wrapper: run one witness, print, write JSON, exit 0 on PASS and 1 on FAIL (2 on a harness error). */
export async function cli(id, runFn) {
  const args = parseArgs();
  let target;
  // a hung engine (a pointer move that never returns, a crashed target) fails loud instead of stalling the run
  const deadline = Number(args.deadline ?? 1800);
  setTimeout(() => { console.error(`${id} HARNESS ERROR: no verdict within ${deadline} s (an engine hung)`); process.exit(2); }, deadline * 1000).unref();
  try {
    const census = await quiet(Number(args["wait-quiet"] ?? 0));
    const lock = await acquireLock(`${id} ${process.argv.slice(2).join(" ")}`);
    const loadStart = load();
    target = await openTarget(args);
    const res = await runFn(args, target);
    res.flavor = target.meta.flavor ?? (target.meta.dev ? "src-dev" : "src");
    res.harness = HARNESS;
    res.run = { loadStart, loadEnd: load(), census, lockWaitS: lock.waitedS };
    for (const d of disconnects) (res.notes ??= []).push(`${ENGINE_LABEL[d.engine]} disconnected (the browser process died) and was relaunched; load ${d.load}`);
    for (const t of stalls) (res.notes ??= []).push(`${ENGINE_LABEL[t.engine]} page load stalled on ${t.scene} (${t.mode}): ${t.first}; ${t.cause}; re-opened on a new browser process, ${t.reproduced ? "REPRODUCED" : "NOT-REPRODUCED"}; load ${t.load}`);
    if (recycles.length) (res.notes ??= []).push(`H3-1: ${ENGINE_LABEL.webkit} browser retired and relaunched ${recycles.length}× at the ${NAV_CAP}-navigation cap; loads ${recycles.map((r) => r.load.split(" / ")[0]).join(", ")}`);
    verdict(res);
    print(res);
    const dir = path.join(outRoot(args), "runs", target.label);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${id}${res.engine ? "-" + res.engine : ""}.json`);
    fs.writeFileSync(file, JSON.stringify(res, null, 1));
    console.log(`  json ${file}`);
    await closeBrowsers(); await target.close(); lock.release();
    process.exit(res.pass ? 0 : 1);
  } catch (e) {
    console.error(`${id} HARNESS ERROR ${e.stack ?? e}`);
    await closeBrowsers(); if (target) await target.close();
    process.exit(2);
  }
}
/** The scene list the page declares (window.__tile.scenes), with the build's migration label (null at HEAD). */
export async function sceneList(target, engine = "chromium") {
  const P = await openPage(target, engine, "__index");
  const { scenes, migration } = await P.page.evaluate(() => ({ scenes: window.__tile.scenes, migration: window.__tile.migration ?? null }));
  await P.close();
  scenes.migration = migration;
  return scenes;
}
/**
 * Scenes a witness judges: gates first, then info rows. A consumer site (`arms: true`) also yields its
 * unmigrated arm (`<id>-verbatim`, reported unless the site lists the witness in `armGates.verbatim`) and, when
 * the build carries a route migration, its migrated arm (`<id>-migrated`, gating as the library arm does). With no
 * migration the migrated arm IS the library arm (the null migration) and is not run twice.
 */
export function scenesFor(list, id, { info = true, arms = true } = {}) {
  const out = [];
  const push = (s, gating) => {
    out.push({ ...s, gating, arm: "library" });
    if (!arms || !s.arms) return;
    out.push({ ...s, id: `${s.id}-verbatim`, base: s.id, gating: (s.armGates?.verbatim ?? []).includes(id), arm: "unmigrated" });
    if (list.migration) out.push({ ...s, id: `${s.id}-migrated`, base: s.id, gating, arm: "migrated" });
  };
  // H3-11 · a state scene (invalid, sibling, tones, display: contents) also renders on the route's migrated markup of
  // the site it names (`migratedArm`), gating as its library arm does, when the route migrates that site
  const pushState = (s, gating) => {
    if (arms && s.migratedArm && (list.migration?.sites ?? []).includes(s.migratedArm)) out.push({ ...s, id: `${s.id}-migrated`, base: s.id, gating, arm: "migrated" });
  };
  for (const s of list) if ((s.gates ?? []).includes(id)) { push(s, true); pushState(s, true); }
  if (info) for (const s of list) if ((s.info ?? []).includes(id)) { push(s, false); pushState(s, false); }
  return out;
}
/** Race a step against a deadline; resolves { ok, value } or { ok: false, error } (a hang or a crashed target). */
export async function within(ms, fn) {
  let timer;
  const t = new Promise((r) => { timer = setTimeout(() => r({ ok: false, error: `no answer within ${ms / 1000} s (hung)` }), ms); });
  const run = fn().then((value) => ({ ok: true, value }), (e) => ({ ok: false, error: String(e.message ?? e).split("\n")[0] }));
  const r = await Promise.race([run, t]);
  clearTimeout(timer);
  return r;
}
export const f2 = (v) => (v === null || v === undefined || Number.isNaN(v) ? "—" : Number(v).toFixed(2));
/** The engines a generic witness runs in (`--engine chromium|webkit`). */
export const engineOf = (args) => (args.engine === "webkit" ? "webkit" : "chromium");
