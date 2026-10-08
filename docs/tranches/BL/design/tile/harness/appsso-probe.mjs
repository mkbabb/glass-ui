#!/usr/bin/env node
// appsso-probe.mjs · H3-1 · which Playwright WebKit navigations consult macOS AppSSO before they load.
//   node appsso-probe.mjs [--n 5]
// The routed T-3 stall (F1-3 / HF-2) is a main-frame navigation whose WebKit policy step
// `SOAuthorizationCoordinator::tryAuthorize` → AppSSOCore `canPerformAuthorizationWithURL` never answers, read in the
// unified log of the stalled Playwright process (H3.md §H3-1). This probe opens N fresh contexts per navigation form
// against a local server, then reads the unified log of its own Playwright process for each form's window and counts
// the AppSSO calls and completions. A form whose count is 0 cannot stall on AppSSO.
//   goto       page.goto(http://127.0.0.1:…/?form=goto)              what openPage does
//   assign     page.goto(about:blank), then location.assign(http…) from the page
//   blank      page.goto(about:blank) only (control: no http navigation)
import { execFileSync } from "node:child_process";
import { browser, closeBrowsers, parseArgs, serve, acquireLock, load, ENGINE_LABEL } from "./lib.mjs";

const a = parseArgs();
const N = Number(a.n ?? 5);
const srv = await serve(() => `<!doctype html><title>probe</title><p>probe</p>`);
const lock = await acquireLock("appsso-probe");
const b = await browser("webkit");
const pidOf = () => {
  const ps = execFileSync("ps", ["-axo", "pid=,ppid=,command="], { encoding: "utf8" }).split("\n").map((l) => l.trim().split(/\s+/));
  const mine = new Set([String(process.pid)]); let grew = true;
  while (grew) { grew = false; for (const [pid, ppid] of ps) if (mine.has(ppid) && !mine.has(pid)) { mine.add(pid); grew = true; } }
  return ps.find(([pid, , cmd]) => mine.has(pid) && /Playwright\.app\/Contents\/MacOS\/Playwright/.test(cmd ?? ""))?.[0];
};
const pid = pidOf();
const ts = () => { const d = new Date(); const p = (n, w = 2) => String(n).padStart(w, "0"); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`; };
const rows = [];
for (const form of ["goto", "assign", "blank"]) {
  const t0 = ts();
  await new Promise((r) => setTimeout(r, 1100));
  for (let i = 0; i < N; i++) {
    const ctx = await b.newContext();
    const page = await ctx.newPage();
    const url = `${srv.url}/?form=${form}&i=${i}`;
    if (form === "goto") await page.goto(url, { waitUntil: "load", timeout: 30000 });
    else if (form === "assign") { await page.goto("about:blank"); await Promise.all([page.waitForURL(url, { waitUntil: "load", timeout: 30000 }), page.evaluate((u) => location.assign(u), url)]); }
    else await page.goto("about:blank");
    await ctx.close();
  }
  await new Promise((r) => setTimeout(r, 1100));
  const t1 = ts();
  let log = "";
  try { log = execFileSync("log", ["show", "--start", t0, "--end", t1, "--predicate", `processID == ${pid} AND eventMessage CONTAINS "canPerformAuthorizationWithURL"`, "--style", "compact"], { encoding: "utf8", maxBuffer: 64 << 20 }); } catch (e) { log = String(e.stdout ?? ""); }
  const calls = (log.match(/Calling async canPerformAuthorizationWithURL/g) ?? []).length;
  const done = (log.match(/Async canPerformAuthorizationWithURL completed/g) ?? []).length;
  rows.push({ form, navigations: N, calls, completed: done });
  console.log(`${form.padEnd(7)} ${N} fresh contexts · AppSSO calls ${calls}, completed ${done} · log ${t0} → ${t1}`);
}
console.log(`${ENGINE_LABEL.webkit} ${b.version()} · Playwright pid ${pid} · load ${load()}`);
console.log(JSON.stringify(rows));
await closeBrowsers(); await srv.close(); lock.release();
