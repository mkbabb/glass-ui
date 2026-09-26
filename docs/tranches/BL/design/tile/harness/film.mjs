#!/usr/bin/env node
// film.mjs · owner-glance FILM of a selection commit under several arms (D4-G question 1, REGISTRY §6.2). Not a witness.
//   node film.mjs --arms glide=<build>,land=<build>,edge=<build> --dest <dir> --scratch <dir>
//                 [--sites preset,specimen] [--modes light,dark] [--engines chromium,webkit]
// Each <build> is a build.mjs output with a route that migrates the site (the arm lives in `<site>-migrated`).
// Per engine × mode × site it writes:
//   <site>-<mode>-<engine>-strip.jpg  a frame strip: one row per arm (top to bottom in --arms order), one column
//                                     per sampled time of ONE programmatic commit (the model changes with focus on
//                                     nothing). Frames are exact: after the commit's style change every animation
//                                     on the page (CSS transitions, WAAPI) is paused and stepped to each time with
//                                     `currentTime`, then shot. Times are printed on the sheet's first row in
//                                     film.json, not burned in.
//   <site>-<mode>-<engine>.mp4        the arms side by side (left to right in --arms order), each a real-time
//                                     Playwright screencast of four pointer commits, trimmed to the first click so
//                                     the arms run in step. Each panel carries its arm's name in the page.
// Anything over --max-kb (default 400) is written to --scratch instead of --dest, and film.json records where.
// Playwright WebKit is not Safari: every WebKit file is labelled "Playwright WebKit" in film.json.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { browser, closeBrowsers, parseArgs, serve, acquireLock, browserCensus, load, ENGINE_LABEL, PNG } from "./lib.mjs";

const a = parseArgs();
if (!a.arms || !a.dest || !a.scratch) { console.error("usage: node film.mjs --arms name=<build>,… --dest <dir> --scratch <dir> [--sites …] [--modes …] [--engines …]"); process.exit(2); }
const ARMS = a.arms.split(",").map((kv) => { const [name, dir] = kv.split("="); return { name, dir: path.resolve(dir) }; });
const SITES = (typeof a.sites === "string" ? a.sites : "preset,specimen").split(",");
const MODES = (typeof a.modes === "string" ? a.modes : "light,dark").split(",");
const ENGINES = (typeof a.engines === "string" ? a.engines : "chromium,webkit").split(",");
const MAX_KB = Number(a["max-kb"] ?? 400);
fs.mkdirSync(a.dest, { recursive: true }); fs.mkdirSync(a.scratch, { recursive: true });

/** The commit the strip films, and the pointer walk the video films, per site (item indices in DOM order). */
const PLAN = {
  // K1 2×2: snappy (top right) → bouncy (bottom left): the diagonal, the longest path across the gap.
  preset: { from: 1, strip: 2, walk: [2, 3, 0, 1], viewport: { width: 540, height: 250 } },
  // K2 auto-fill in FadingScroll: ease-in-quad (row 0 right) → ease-in-cubic (row 2 left): two rows down and across.
  specimen: { from: 1, strip: 4, walk: [4, 5, 0, 1], viewport: { width: 540, height: 470 } },
};
const TIMES = [0, 40, 80, 120, 160, 220, 300, 420, 700];

const servers = {};
for (const arm of ARMS) servers[arm.name] = await serve(path.join(arm.dir, "dist"));

async function open(engine, arm, site, mode, { video = null, dsf = 1 } = {}) {
  const b = await browser(engine);
  const ctx = await b.newContext({ viewport: PLAN[site].viewport, deviceScaleFactor: dsf, colorScheme: mode === "dark" ? "dark" : "light",
    ...(video ? { recordVideo: { dir: video, size: PLAN[site].viewport } } : {}) });
  const t0 = Date.now();
  const page = await ctx.newPage();
  const q = new URLSearchParams({ scene: `${site}-migrated`, sel: String(PLAN[site].from) });
  if (mode === "dark") q.set("mode", "dark");
  await page.goto(`${servers[arm.name].url}/index.html?${q}`, { waitUntil: "load" });
  await page.waitForFunction(() => window.__tile && window.__tile.ready === true, null, { timeout: 30000 });
  await page.evaluate(() => document.fonts.ready.then(() => true));
  // the page is framed on the scene: the sentinels hidden, the padding trimmed, the arm's name in a corner
  await page.addStyleTag({ content: `.tx-sentinel{display:none!important}.tx-page{padding:8px!important}
    #film-label{position:fixed;right:6px;bottom:4px;font:600 11px/1 ui-monospace,monospace;color:#888;z-index:99;letter-spacing:.04em}` });
  await page.evaluate((name) => { const d = document.createElement("div"); d.id = "film-label"; d.textContent = name; document.body.append(d); }, arm.name);
  await page.mouse.move(1, 1);
  await page.waitForTimeout(500);
  return { ctx, page, t0 };
}

const out = { tool: "film.mjs", arms: ARMS.map((x) => ({ name: x.name, build: JSON.parse(fs.readFileSync(path.join(x.dir, "build.json"), "utf8")) })), times: TIMES, files: [] };
const lock = await acquireLock("film");
console.log(`film · lock waited ${lock.waitedS}s · other browsers ${browserCensus().n} · load ${load()}`);

function place(file, bytes) {
  const kb = bytes / 1024;
  const dir = kb <= MAX_KB ? a.dest : a.scratch;
  return { dir, kb: +kb.toFixed(1) };
}

for (const engine of ENGINES) for (const mode of MODES) for (const site of SITES) {
  const label = `${site}-${mode}-${engine}`;
  // ── the strip: one programmatic commit, stepped frame by frame ──
  const rows = [];
  for (const arm of ARMS) {
    const { ctx, page } = await open(engine, arm, site, mode);
    const clip = await page.evaluate((plan) => {
      const its = [...document.querySelectorAll("[data-item]")];
      const pick = [plan.from, plan.strip].map((i) => its[i].getBoundingClientRect());
      const g = document.querySelector("[data-group]").getBoundingClientRect();
      const top = Math.min(...pick.map((r) => r.top)) - 10, bottom = Math.max(...pick.map((r) => r.bottom)) + 10;
      return { x: Math.max(0, Math.floor(g.left - 6)), y: Math.max(0, Math.floor(top)), width: Math.ceil(g.width + 12), height: Math.ceil(bottom - top) };
    }, PLAN[site]);
    await page.evaluate(async (i) => {
      await window.__tile.select(i);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      window.__film = document.getAnimations().filter((an) => an.timeline === document.timeline); // scroll-driven (FadingScroll) keep their scroll timeline
      for (const an of window.__film) an.pause();
    }, PLAN[site].strip);
    const frames = [];
    for (const t of TIMES) {
      const n = await page.evaluate(async (t) => {
        for (const an of window.__film) an.currentTime = t;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        return window.__film.length;
      }, t);
      frames.push({ t, n, png: PNG.sync.read(await page.screenshot({ clip, animations: "allow", caret: "hide" })) });
    }
    rows.push({ arm: arm.name, frames, animations: frames[0].n });
    await ctx.close();
  }
  const fw = Math.max(...rows.flatMap((r) => r.frames.map((f) => f.png.width))), fh = Math.max(...rows.flatMap((r) => r.frames.map((f) => f.png.height))), G = 6;
  const sheet = new PNG({ width: TIMES.length * (fw + G) + G, height: rows.length * (fh + G) + G });
  sheet.data.fill(128);
  rows.forEach((r, ri) => r.frames.forEach((f, fi) => PNG.bitblt(f.png, sheet, 0, 0, f.png.width, f.png.height, G + fi * (fw + G), G + ri * (fh + G))));
  const tmpPng = path.join(a.scratch, `${label}-strip.png`);
  fs.writeFileSync(tmpPng, PNG.sync.write(sheet));
  const tmpJpg = path.join(a.scratch, `${label}-strip.tmp.jpg`);
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "72", tmpPng, "--out", tmpJpg], { stdio: "ignore" });
  const sp = place(tmpJpg, fs.statSync(tmpJpg).size);
  const stripFile = path.join(sp.dir, `${label}-strip.jpg`);
  fs.renameSync(tmpJpg, stripFile);
  out.files.push({ kind: "strip", engine: ENGINE_LABEL[engine], mode, site, file: stripFile, kb: sp.kb, rows: rows.map((r) => ({ arm: r.arm, animationsPaused: r.animations })), times: TIMES, frame: `${fw}×${fh}` });
  console.log(`${label} strip → ${stripFile} (${sp.kb} KB; rows ${rows.map((r) => `${r.arm}:${r.animations} anims`).join(", ")}) · load ${load()}`);

  // ── the video: four pointer commits in real time, per arm, then side by side ──
  const clips = [];
  for (const arm of ARMS) {
    const vdir = path.join(a.scratch, "video", label, arm.name);
    fs.rmSync(vdir, { recursive: true, force: true });
    const { ctx, page, t0 } = await open(engine, arm, site, mode, { video: vdir });
    const centers = await page.evaluate(() => [...document.querySelectorAll("[data-item]")].map((e) => { const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }));
    await page.waitForTimeout(400);
    const firstClick = (Date.now() - t0) / 1000;
    for (const i of PLAN[site].walk) {
      await page.mouse.move(centers[i][0], centers[i][1], { steps: 6 });
      await page.mouse.down(); await page.waitForTimeout(70); await page.mouse.up();
      await page.waitForTimeout(950);
    }
    const video = page.video();
    await ctx.close();
    const webm = await video.path();
    clips.push({ arm: arm.name, webm, firstClick: +firstClick.toFixed(2) });
  }
  const dur = PLAN[site].walk.length * 1.07 + 0.4;
  const inputs = clips.flatMap((c) => ["-ss", String(Math.max(0, c.firstClick - 0.3)), "-t", String(dur), "-i", c.webm]);
  const tmpMp4 = path.join(a.scratch, `${label}.tmp.mp4`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...inputs, "-filter_complex", `${clips.map((_, i) => `[${i}:v]setpts=PTS-STARTPTS,fps=30[v${i}]`).join(";")};${clips.map((_, i) => `[v${i}]`).join("")}hstack=inputs=${clips.length}[v]`,
    "-map", "[v]", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "30", "-preset", "slow", "-movflags", "+faststart", tmpMp4]);
  const vp = place(tmpMp4, fs.statSync(tmpMp4).size);
  const mp4 = path.join(vp.dir, `${label}.mp4`);
  fs.renameSync(tmpMp4, mp4);
  out.files.push({ kind: "video", engine: ENGINE_LABEL[engine], mode, site, file: mp4, kb: vp.kb, panels: clips.map((c) => c.arm), walk: PLAN[site].walk, sources: clips });
  console.log(`${label} video → ${mp4} (${vp.kb} KB; panels ${clips.map((c) => c.arm).join(" | ")}) · load ${load()}`);
}
fs.writeFileSync(path.join(a.dest, "film.json"), JSON.stringify(out, null, 1));
await closeBrowsers();
for (const s of Object.values(servers)) await s.close();
lock.release();
