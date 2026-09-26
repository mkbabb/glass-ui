// safari.mjs · H-11: the real-Safari target. safaridriver is plain W3C WebDriver over HTTP. This module starts it
// on a free port, asks for a session, and, when Safari grants one, runs T-1 (fine) and T-3 (light, dark) on the
// T-8 scenes through the same in-page helpers the Playwright engines use: executed scripts for geometry, element
// screenshots for paint. When the session is refused (the owner has not ticked Develop ▸ Allow Remote Automation,
// the one enable path) or the driver is missing, it returns one cell, UNMEASURED, with the driver's own reason.
// It never reports a Playwright WebKit number as Safari's, and it stops the driver it started.
//   node safari.mjs --build <dir>     (probe + cells, printed; T-8 calls safariCells itself)
import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import { IN_PAGE, SAFARI_CELL, PNG, compare, meanRect, contrast, f2, parseArgs, openTarget, sceneList, scenesFor, load } from "./lib.mjs";
import { CORNER_STORY, judgeT1, stepLine } from "./measure.mjs";

const DRIVER = "/usr/bin/safaridriver";
const freePort = () => new Promise((r) => { const s = net.createServer(); s.listen(0, "127.0.0.1", () => { const p = s.address().port; s.close(() => r(p)); }); });
async function wd(base, method, path, body) {
  const res = await fetch(base + path, { method, headers: { "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.value?.error) throw new Error(json.value?.message ?? `${method} ${path} → ${res.status}`);
  return json.value;
}

/** Start safaridriver and ask for a session: { ok, reason } or { ok, base, sid, version, stop }. */
export async function safariSession() {
  if (!fs.existsSync(DRIVER)) return { ok: false, reason: `${DRIVER} is absent` };
  const port = await freePort();
  const proc = spawn(DRIVER, ["-p", String(port)], { stdio: "ignore" });
  const stop = () => { try { proc.kill("SIGTERM"); } catch {} };
  const base = `http://127.0.0.1:${port}`;
  for (let k = 0; k < 50; k++) { try { await wd(base, "GET", "/status"); break; } catch { await new Promise((r) => setTimeout(r, 200)); } }
  try {
    const v = await wd(base, "POST", "/session", { capabilities: { alwaysMatch: { browserName: "safari" } } });
    return { ok: true, base, sid: v.sessionId, version: v.capabilities?.browserVersion ?? "?", stop };
  } catch (e) { stop(); return { ok: false, reason: String(e.message ?? e).split("\n")[0] }; }
}

async function sPage(S, target, scene, query = {}) {
  const q = new URLSearchParams({ scene, ...query });
  await wd(S.base, "POST", `/session/${S.sid}/url`, { url: target.url(q.toString()) });
  const x = (script, args = []) => wd(S.base, "POST", `/session/${S.sid}/execute/sync`, { script, args });
  const xa = (script, args = []) => wd(S.base, "POST", `/session/${S.sid}/execute/async`, { script, args });
  for (let k = 0; k < 100; k++) { if (await x("return !!(window.__tile && window.__tile.ready)")) break; await new Promise((r) => setTimeout(r, 100)); }
  await x(IN_PAGE);
  await new Promise((r) => setTimeout(r, 700));
  const shotOf = async (sel) => {
    const el = await wd(S.base, "POST", `/session/${S.sid}/element`, { using: "css selector", value: sel });
    const id = Object.values(el)[0];
    const b64 = await wd(S.base, "GET", `/session/${S.sid}/element/${id}/screenshot`);
    const png = PNG.sync.read(Buffer.from(b64, "base64"));
    return png;
  };
  return { x, xa, shotOf };
}

/** The Safari cells for T-8; one UNMEASURED cell when Safari refuses the session. */
export async function safariCells(target, scenes) {
  const S = await safariSession();
  if (!S.ok) return [{ gating: true, pass: null, line: `${SAFARI_CELL} · safaridriver: ${S.reason}` }];
  const cells = [];
  const label = `real Safari ${S.version}`;
  try {
    for (const sc of scenes) {
      const p = await sPage(S, target, sc.id);
      const n = await p.x("return window.__th.tag()");
      const seen = new Set();
      for (let i = 0; i < n; i++) {
        const st = await p.xa(`const done = arguments[arguments.length - 1]; (${CORNER_STORY.toString()})(arguments[0]).then(done)`, [i]);
        const key = `${st.holder}|${st.steps[0].w.toFixed(0)}x${st.steps[0].h.toFixed(0)}`;
        if (seen.has(key)) continue; seen.add(key);
        const j = judgeT1(st, sc.holder ?? "tile");
        cells.push({ gating: true, pass: j.pass, scene: sc.id, line: `${label} T-1 ${sc.id} fine #${i} · ${stepLine(st)} · ${j.pass === null ? j.why : `bound ${j.bound}: ${j.pass ? "met" : "missed"}`}` });
      }
      for (const mode of ["light", "dark"]) {
        const m = await sPage(S, target, sc.id, mode === "dark" ? { mode: "dark" } : {});
        const info = await m.x(`const th = window.__th; th.tag(); const its = th.items(); const s = its.findIndex((e) => th.on(e)); const u = its.findIndex((e, k) => k !== s && !th.on(e));
          th.hideInk(true); for (const k of [s, u]) if (k >= 0) th.pin(its[k], true); return { s, u, corner: s >= 0 ? th.corner(its[s]).used : 0 };`);
        if (info.s < 0 || info.u < 0) { cells.push({ gating: true, pass: false, scene: sc.id, line: `${label} T-3 ${sc.id} ${mode} · no selected/unselected pair` }); continue; }
        await new Promise((r) => setTimeout(r, 350));
        const A = await m.shotOf(`[data-th-idx="${info.s}"]`), B = await m.shotOf(`[data-th-idx="${info.u}"]`);
        const w = Math.min(A.width, B.width), h = Math.min(A.height, B.height);
        const crop = (png) => { const o = new PNG({ width: w, height: h }); PNG.bitblt(png, o, 0, 0, w, h, 0, 0); return { png: o, clip: { x: 0, y: 0, width: w, height: h }, dsf: 1 }; };
        const a = crop(A), b = crop(B), dsf = A.width / (await m.x(`return document.querySelector('[data-th-idx="${info.s}"]').getBoundingClientRect().width`));
        const inset = Math.min(Math.max(info.corner * 0.3, 6) * dsf, w / 3, h / 3);
        const fill = contrast(meanRect(a, { x: inset, y: inset, w: w - 2 * inset, h: h - 2 * inset }), meanRect(b, { x: inset, y: inset, w: w - 2 * inset, h: h - 2 * inset }));
        const cmp = compare(a, b, null, Math.round(4 * dsf));
        const area = cmp.c3 / (dsf * dsf), perim = 2 * (w + h) / dsf;
        cells.push({ gating: true, pass: fill >= 3 || area >= 0.5 * perim, scene: sc.id, line: `${label} T-3 ${sc.id} ${mode} (.dark class; the colour-scheme media stays the driver's) · carrier area ${f2(area)} px² vs the bar ${f2(0.5 * perim)}; fill ${f2(fill)}:1 · load ${load()}` });
      }
    }
  } catch (e) {
    cells.push({ gating: true, pass: false, line: `${label} · driver error ${String(e.message ?? e).split("\n")[0]}` });
  } finally {
    await wd(S.base, "DELETE", `/session/${S.sid}`).catch(() => {});
    S.stop();
  }
  return cells;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = parseArgs();
  const target = await openTarget(args.build ? args : { fixture: true });
  const scenes = scenesFor(await sceneList(target), "T-8", { info: false, arms: false });
  for (const c of await safariCells(target, scenes)) console.log(`${c.pass === null ? "UNMEASURED" : c.pass ? "PASS" : "FAIL"} ${c.line}`);
  await target.close();
  process.exit(0);
}
